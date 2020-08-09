---
path: "/snippet-3"
date: 2020-08-08T17:12:33.962Z
title: "Snippet 3 - Mel Filterbank Calculation in Swift"
---

```Swift
import Foundation
import Accelerate

class Melcepstrum {
    let nMels: Int
    let nFFT: Int
    var melFilters: [Float] = []

    init(nFFT: Int = 512, sampleRate: Int = 44100, nMels: Int = 40) {
        self.nMels = nMels
        self.nFFT = nFFT
        self.melFilters = mel(sampleRate: sampleRate, nFFT: nFFT, nMels: nMels)
    }

    //https://stackoverflow.com/questions/58995021/how-to-get-a-floating-point-number-interval-of-fixed-length-and-bounds-in-swift
    // linspace in Swift is off by one from Python version, that is, use python_in - 1 for 3rd parameter.
    private func linspace<T>(from start: T, through end: T, in samples: Int) -> StrideThrough<T>
        where T : FloatingPoint, T == T.Stride {
        return Swift.stride(from: start, through: end, by: (end - start) / T(samples))
    }

    func mel(sampleRate: Int, nFFT: Int, nMels: Int, slaney: Bool = true) -> [Float] {
        let melNyquist = (2595 * log10(1 + (Double(sampleRate) / 2.0) / 700))
        let melPoints = Array(linspace(from: 0, through: melNyquist, in: nMels + 1))
        var hzPoints = melPoints.map { (mel) -> Double in
            700 * (pow(10, mel / 2595) - 1)
        }
        
        // linspace unreliable sometimes? need to fix this.
        if (hzPoints.count < nMels + 2) {
            hzPoints.append(Double(sampleRate) / 2.0)
        }
        let freqFFT = Array(linspace(from: 0, through: Float(sampleRate / 2), in: nFFT / 2))
        var filterBank: [[Float]] {
            var a = [[Float]](repeating: [Float](repeating: 0, count: nFFT / 2 + 1), count: nMels)
            // could do away with the matrix completely, or convert to sparse format.
            for filterIndex in 1..<(nMels + 1) {
                for (freqIndex, freq) in freqFFT.enumerated() {
                    // lots of Float casting due to swift type checking.
                    let leftSlope: Float = Float(1 / (hzPoints[filterIndex] - hzPoints[filterIndex - 1]))
                    let leftLine: Float = (Float(freq) - Float(hzPoints[filterIndex - 1])) * leftSlope
                    let rightSlope: Float = Float(1 / (hzPoints[filterIndex + 1] - hzPoints[filterIndex]))
                    let rightLine: Float = (Float(hzPoints[filterIndex + 1]) - Float(freq)) * rightSlope
                    a[filterIndex - 1][freqIndex] = max(0, min(leftLine, rightLine))
                    if slaney {
                        let normFactor: Float = Float(2 / (hzPoints[filterIndex + 1] - hzPoints[filterIndex - 1]))
                        a[filterIndex - 1][freqIndex] *= normFactor
                    }
                }
            }
            return a
        }
        let flatFilterBank = filterBank.reduce([], +)
        return flatFilterBank
    }

    func applyFilter(powerSpectrum: UnsafeMutablePointer<Float>) -> [Float] {
        var outputMels = [Float](repeating: 0.0, count: self.nMels)
        
        // use cblas_sgemv? or dgemv
        cblas_sgemm(CblasRowMajor, CblasNoTrans, CblasNoTrans, Int32(self.nMels), 1, Int32(self.nFFT / 2 + 1), 1.0,
                    &self.melFilters, Int32(self.nFFT / 2 + 1), powerSpectrum, 1, 0.0, &outputMels, 1)
                
        return outputMels
    }
}
```

This class calculates Mel filterbanks, a preprocessing step in keyword spotting. As far as I know, there seem to be very few implementations of this in Swift. A helpful resource that explains it better than I could: https://haythamfayek.com/2016/04/21/speech-processing-for-machine-learning.html#fn:1. I have observed in practice that the filterbanks are enough as features, and the DCT is a somewhat redundant linear transform.

To further optimize this, we could do away the 2d matrix, since each filter is a triangle filter which is supported only on a few frequencies. However, I have observed that this calculation already runs with almost no overhead. The main bottleneck is the keyword spotting CNN itself. For more information on how this class is integrated into a project, check out my project here: https://github.com/BryanWBear/GifControl.

