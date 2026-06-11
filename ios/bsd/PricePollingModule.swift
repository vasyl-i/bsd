import Foundation
import React

@objc(PricePollingModule)
class PricePollingModule: RCTEventEmitter {

  private var timer: Timer?
  private var hasListeners = false

  private let apiURL = "https://api.binance.com/api/v3/klines?symbol=BTCEUR&interval=15m&limit=96"

  override static func moduleName() -> String! {
    return "PricePollingModule"
  }

  @objc override static func requiresMainQueueSetup() -> Bool {
    return false
  }

  override func supportedEvents() -> [String]! {
    return ["onPriceUpdate"]
  }

  override func startObserving() {
    hasListeners = true
  }

  override func stopObserving() {
    hasListeners = false
  }

  @objc func startPolling(_ intervalMs: Double) {
    stopPolling()

    let interval = intervalMs / 1000.0

    fetchPrice()

    DispatchQueue.main.async { [weak self] in
      self?.timer = Timer.scheduledTimer(withTimeInterval: interval, repeats: true) { [weak self] _ in
        self?.fetchPrice()
      }
    }
  }

  @objc func stopPolling() {
    timer?.invalidate()
    timer = nil
  }

  private func fetchPrice() {
    guard let url = URL(string: apiURL) else { return }

    URLSession.shared.dataTask(with: url) { [weak self] data, _, error in
      guard let self = self, self.hasListeners else { return }
      guard let data = data, error == nil else { return }

      do {
        let json = try JSONSerialization.jsonObject(with: data)
        self.sendEvent(withName: "onPriceUpdate", body: json)
      } catch {}
    }.resume()
  }
}
