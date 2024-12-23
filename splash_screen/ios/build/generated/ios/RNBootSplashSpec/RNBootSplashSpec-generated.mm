/**
 * This code was generated by [react-native-codegen](https://www.npmjs.com/package/react-native-codegen).
 *
 * Do not edit this file as changes may cause incorrect behavior and will be lost
 * once the code is regenerated.
 *
 * @generated by codegen project: GenerateModuleObjCpp
 *
 * We create an umbrella header (and corresponding implementation) here since
 * Cxx compilation in BUCK has a limitation: source-code producing genrule()s
 * must have a single output. More files => more genrule()s => slower builds.
 */

#import "RNBootSplashSpec.h"


@implementation NativeRNBootSplashSpecBase


- (void)setEventEmitterCallback:(EventEmitterCallbackWrapper *)eventEmitterCallbackWrapper
{
  _eventEmitterCallback = std::move(eventEmitterCallbackWrapper->_eventEmitterCallback);
}
@end


namespace facebook::react {
  
    static facebook::jsi::Value __hostFunction_NativeRNBootSplashSpecJSI_hide(facebook::jsi::Runtime& rt, TurboModule &turboModule, const facebook::jsi::Value* args, size_t count) {
      return static_cast<ObjCTurboModule&>(turboModule).invokeObjCMethod(rt, PromiseKind, "hide", @selector(hide:resolve:reject:), args, count);
    }

    static facebook::jsi::Value __hostFunction_NativeRNBootSplashSpecJSI_isVisible(facebook::jsi::Runtime& rt, TurboModule &turboModule, const facebook::jsi::Value* args, size_t count) {
      return static_cast<ObjCTurboModule&>(turboModule).invokeObjCMethod(rt, PromiseKind, "isVisible", @selector(isVisible:reject:), args, count);
    }

    static facebook::jsi::Value __hostFunction_NativeRNBootSplashSpecJSI_getConstants(facebook::jsi::Runtime& rt, TurboModule &turboModule, const facebook::jsi::Value* args, size_t count) {
      return static_cast<ObjCTurboModule&>(turboModule).invokeObjCMethod(rt, ObjectKind, "getConstants", @selector(getConstants), args, count);
    }

  NativeRNBootSplashSpecJSI::NativeRNBootSplashSpecJSI(const ObjCTurboModule::InitParams &params)
    : ObjCTurboModule(params) {
      
        methodMap_["hide"] = MethodMetadata {1, __hostFunction_NativeRNBootSplashSpecJSI_hide};
        
        
        methodMap_["isVisible"] = MethodMetadata {0, __hostFunction_NativeRNBootSplashSpecJSI_isVisible};
        
        
        methodMap_["getConstants"] = MethodMetadata {0, __hostFunction_NativeRNBootSplashSpecJSI_getConstants};
        
  }
} // namespace facebook::react
