#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE(PricePollingModule, RCTEventEmitter)

RCT_EXTERN_METHOD(startPolling:(double)intervalMs)
RCT_EXTERN_METHOD(stopPolling)

@end