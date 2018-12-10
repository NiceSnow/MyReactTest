//
//  GQBridgeModuleManager.m
//  GED_iOS
//
//  Created by Madodg on 2018/3/27.
//  Copyright © 2018年 Madodg. All rights reserved.
//

#import "GQBridgeModuleManager.h"
@implementation GQBridgeModuleManager


+ (id)allocWithZone:(NSZone *)zone {
    static GQBridgeModuleManager *sharedInstance = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        sharedInstance = [super allocWithZone:zone];
        if (sharedInstance) {
//            [[NSNotificationCenter defaultCenter] addObserver:sharedInstance
//                                                     selector:@selector(feedbackSubmit:)
//                                                         name:GQFeedbackSubmitNotification
//                                                       object:nil];
//            [[NSNotificationCenter defaultCenter] addObserver:sharedInstance
//                                                     selector:@selector(loginSuccessNotifionJs:)
//                                                         name:GQLoginSuccessNotificationJs
//                                                       object:nil];
//            [[NSNotificationCenter defaultCenter] addObserver:sharedInstance
//                                                     selector:@selector(loginOutNotifionJs:)
//                                                         name:GQLoginOutSuccessNotificationJs
//                                                       object:nil];
//
//            [[NSNotificationCenter defaultCenter] addObserver:sharedInstance
//                                                     selector:@selector(backActionNotifion:)
//                                                         name:GQBackActionNotificationJs
//                                                       object:nil];
//            [[NSNotificationCenter defaultCenter] addObserver:sharedInstance
//                                                     selector:@selector(homeRefresh:)
//                                                         name:GQHomeRefresh
//                                                       object:nil];
//            [[NSNotificationCenter defaultCenter] addObserver:sharedInstance
//                                                     selector:@selector(productRefresh:)
//                                                         name:GQProductRefreshNotificationJs
//                                                       object:nil];
//            [[NSNotificationCenter defaultCenter] addObserver:sharedInstance
//                                                     selector:@selector(pitcherRefresh:)
//                                                         name:GQPitcherRefreshNotificationJs
//                                                       object:nil];
//            [[NSNotificationCenter defaultCenter] addObserver:sharedInstance
//                                                     selector:@selector(investmentRefresh:)
//                                                         name:GQInvestmentRefreshNotificationJs
//                                                       object:nil];
//            [[NSNotificationCenter defaultCenter] addObserver:sharedInstance
//                                                     selector:@selector(standardRefresh:)
//                                                         name:GQStandardRefreshNotificationJs
//                                                       object:nil];
//            [[NSNotificationCenter defaultCenter] addObserver:sharedInstance
//                                                     selector:@selector(debtRefresh:)
//                                                         name:GQDebtRefreshNotificationJs
//                                                       object:nil];
//
//            [[NSNotificationCenter defaultCenter] addObserver:sharedInstance
//                                                     selector:@selector(lendRefresh:)
//                                                         name:GQLoanRefreshNotificationJs
//                                                       object:nil];
//            [[NSNotificationCenter defaultCenter] addObserver:sharedInstance
//                                                     selector:@selector(homeShowAdView:)
//                                                         name:GQHomeAdViewNotificationJs
//                                                       object:nil];
        }
    });
    return sharedInstance;
}



- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}
- (NSArray<NSString *> *)supportedEvents
{
//    return @[GQFeedbackSubmitNotification,
//             GQLoginSuccessNotificationJs,
//             GQLoginOutSuccessNotificationJs,
//             GQBackActionNotificationJs,
//             GQHomeRefresh,
//             GQProductRefreshNotificationJs,
//             GQPitcherRefreshNotificationJs,
//             GQInvestmentRefreshNotificationJs,
//             GQStandardRefreshNotificationJs,
//             GQDebtRefreshNotificationJs,
//             GQLoanRefreshNotificationJs,
//             GQHomeAdViewNotificationJs,
//            ];
    return @[@"112"];
}
-(void)dealloc{
}
/*
-(void)homeShowAdView:(NSNotification * )notifion{
    [self sendEventWithName:GQHomeAdViewNotificationJs body:notifion.object];
}
//债转详情页刷新
- (void)debtRefresh:(NSNotification *)notifion{
    [self sendEventWithName:GQDebtRefreshNotificationJs body:notifion.object];
}

- (void)lendRefresh:(NSNotification *)notifion{
    [self sendEventWithName:GQLoanRefreshNotificationJs body:notifion.object];
}

//散标详情页刷新
- (void)standardRefresh:(NSNotification *)notifion{
    [self sendEventWithName:GQStandardRefreshNotificationJs body:notifion.object];
}
//投呗详情页刷新
- (void)investmentRefresh:(NSNotification *)notifion{
    [self sendEventWithName:GQInvestmentRefreshNotificationJs body:notifion.object];
}
//神投手详情页刷新
- (void)pitcherRefresh:(NSNotification *)notifion{
    [self sendEventWithName:GQPitcherRefreshNotificationJs body:notifion.object];
}
//产品详情页刷新
- (void)productRefresh:(NSNotification *)notifion{
    [self sendEventWithName:GQProductRefreshNotificationJs body:notifion.object];
}
- (void)homeRefresh:(NSNotification *)notifion{
    [self sendEventWithName:GQHomeRefresh body:nil];
}
//意见反馈提交
- (void)feedbackSubmit:(NSNotification *)notifion{
    [self sendEventWithName:GQFeedbackSubmitNotification body:nil];
}
//登录成功把登录状态传给JS
- (void)loginSuccessNotifionJs:(NSNotification *)notifion{
    [self sendEventWithName:GQLoginSuccessNotificationJs body:notifion.object];
}
//登录成功把登录状态传给JS
- (void)loginOutNotifionJs:(NSNotification *)notifion
{
    [self sendEventWithName:GQLoginOutSuccessNotificationJs body:notifion.object];
}
//意见反馈 返回通知
-(void)backActionNotifion:(NSNotification *)notifion{
     [self sendEventWithName:GQBackActionNotificationJs body:notifion.object];
}
*/

RCT_EXPORT_MODULE()
/**
 *  @brief  js 调用原生方法
 *  @param(NSString) actionType js层传给原生跳转类型
 *  @param(NSDictionary)params js传原生数据
 *  @param(RCTResponseSenderBlock) js传原生回调方法
 */
RCT_EXPORT_METHOD(jsJumpNativeBridgeModule:(NSString*)actionType param:(NSDictionary*)params callBack:(RCTResponseSenderBlock)callback){
    NSLog(@"jsJumpNativeBridgeModule");
    //获取当前的 viewcontroller
//    MMBaseViewController *topViewControl = (MMBaseViewController *)[UIApplication getCurrentShowViewController];
//
//    if([topViewControl isKindOfClass:[MMBaseViewController class]]){
//        [topViewControl dispatchAction:actionType param:params callBack:callback];
//    }else{
//        GQNavigationController * nav = GET_AppDelegate.tabbarController.childViewControllers[GET_AppDelegate.tabbarController.selectedIndex];
//        MMBaseViewController *currentViewControl =(MMBaseViewController*)[nav topViewController];
//        [currentViewControl dispatchAction:actionType param:params callBack:callback];
//    }
}

/**
 *  @brief  js 调用原生方法
 *  @param(NSString) actionType js层传给原生跳转类型
 *  @param(NSDictionary)params js传原生数据
 *  @param(RCTResponseSenderBlock) js传原生回调方法
 */
RCT_EXPORT_METHOD(getLoginControllerWithErrorString:(NSString *)errorStr){
    
//    [GQUserInterfaceTool gq_showToastMessage:errorStr];
//    [GQRouter turnToSignViewController];
}

/**
 *  @brief  js 调用原生加载框
 *  @param(NSString) hubWithhType 加载框是展示或者隐藏
 */
RCT_EXPORT_METHOD(showLoadingHubWithType:(NSString*)hubWithhType){
    //获取当前的 viewcontroller
//     MMBaseViewController *topViewControl = (MMBaseViewController *)[UIApplication getCurrentShowViewController];
//    if([topViewControl isKindOfClass:[MMBaseViewController class]]){
//        if([hubWithhType isEqualToString:@"GQLoadingActivityShow"]){
//            [topViewControl showLoadView];
//        }else if([hubWithhType isEqualToString:@"GQLoadingActivityHide"]){
//
//            dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.5 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
//                [topViewControl hideLoadView];
//            });
//        }
//    }else{
//        GQNavigationController * nav = GET_AppDelegate.tabbarController.childViewControllers[GET_AppDelegate.tabbarController.selectedIndex];
//        MMBaseViewController *currentViewControl =(MMBaseViewController*)[nav topViewController];
//        if([hubWithhType isEqualToString:@"GQLoadingActivityShow"]){
//            [currentViewControl showLoadView];
//        }else if([hubWithhType isEqualToString:@"GQLoadingActivityHide"]){
//            dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.5 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
//                [currentViewControl hideLoadView];
//
//            });
//
//        }
//    }

}
@end
