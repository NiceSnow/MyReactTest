//
//  RNMBProgressHUD.m
//  JinhuiCentury
//
//  Created by lang on 2018/9/28.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "RNMBProgressHUD.h"
#import "MBProgressHUD.h"
#import "YYCategories.h"
#import "GQApplication+GetShowViewController.h"
#import "GQIKnowDialog.h"


@interface RNMBProgressHUD()

@property (nonatomic,strong) MBProgressHUD *hub;
@property (nonatomic,strong) MBProgressHUD *iKnowHub;
@property (nonatomic,strong) UIWindow *window;

@end

@implementation RNMBProgressHUD

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(showText:(NSString *)message duration:(NSInteger)duration)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        if(self.hub){
            [self.hub hideAnimated:YES];
        }
        CGFloat screenHeight = [UIScreen mainScreen].bounds.size.height;
        CGFloat topBarHeight = [UIApplication sharedApplication].statusBarFrame.size.height;
        CGFloat navBarHeight = [[UINavigationController alloc]initWithRootViewController:[UIViewController new]].navigationBar.bounds.size.height;
        self.hub = [MBProgressHUD showHUDAddedTo:self.window animated:YES];
        self.hub.offset = CGPointMake(0.0,-(screenHeight/2.0-topBarHeight-navBarHeight-30));
        self.hub.mode = MBProgressHUDModeText;
        self.hub.label.font = [UIFont systemFontOfSize:14];
        self.hub.label.text = message;
        self.hub.label.numberOfLines = 0;
        self.hub.label.textColor = UIColor.whiteColor;
        self.hub.margin = 10;
        self.hub.bezelView.backgroundColor = UIColorHex(4aa8fd);
        self.hub.bezelView.layer.cornerRadius = 18;
        if (self.hub) {
            [self.hub hideAnimated:YES afterDelay:duration / 1000];
            self.hub = NULL;
        }
    });
    
}

RCT_EXPORT_METHOD(showLoading:(NSString *)message){
    dispatch_async(dispatch_get_main_queue(), ^{
        if(self.hub){
            [self.hub hideAnimated:YES];
        }
        UIViewController *currentVC = [UIApplication getCurrentShowViewController];
        self.hub = [MBProgressHUD showHUDAddedTo:currentVC.view animated:YES];
        self.hub.mode = MBProgressHUDModeIndeterminate;
        self.hub.label.text = message;
    });
}

RCT_EXPORT_METHOD(hiddenLoading){
    dispatch_async(dispatch_get_main_queue(), ^{
        if(self.hub){
            [self.hub hideAnimated:YES];
        }
    });
}

RCT_EXPORT_METHOD(showIKnowText:(NSString *)message) {
    dispatch_async(dispatch_get_main_queue(), ^{
        
//        UIAlertController *alertC = [UIAlertController alertControllerWithTitle:nil message:message preferredStyle:UIAlertControllerStyleAlert];
//        [alertC addAction:[UIAlertAction actionWithTitle:@"我知道了" style:UIAlertActionStyleDefault handler:^(UIAlertAction * _Nonnull action) {
//            
//        }]] ;
//        [self presentViewController:alertC animated:YES completion:nil];
//        if(self.iKnowHub){
//            [self.iKnowHub hideAnimated:YES];
//        }
//        GQIKnowDialog *view = [[NSBundle mainBundle] loadNibNamed:@"GQIKnowDialog" owner:self options:nil].firstObject;
//        view.message = message;
//        @weakify(self)
//        view.buttonAction = ^{
//            @strongify(self)
//            dispatch_async(dispatch_get_main_queue(), ^{
//                [self.iKnowHub hideAnimated:YES];
//            });
//        };
//        self.iKnowHub = [MBProgressHUD showHUDAddedTo:self.window animated:YES];
//        self.iKnowHub.mode = MBProgressHUDModeCustomView;
//        self.iKnowHub.removeFromSuperViewOnHide = YES;
//        self.iKnowHub.customView = view;
//        self.iKnowHub.margin = 20;
//        self.iKnowHub.backgroundColor = [UIColor colorWithRGB:0x343434 alpha:0.2];
//        self.iKnowHub.bezelView.backgroundColor = [UIColor whiteColor];
    });
    
}

-(UIWindow *)window{
    
    if (!_window) {
        _window = [UIApplication sharedApplication].keyWindow;
    }
    return _window;
}

@end
