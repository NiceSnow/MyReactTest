//
//  UIApplication+GetShowViewController.h
//  LetvShop
//
//  Created by wangfeng on 16/8/1.
//  Copyright © 2018年 wangfeng  All rights reserved.
//

#import <UIKit/UIKit.h>

@interface UIApplication (GetShowViewController)
/*
 获取最上层的viewcontroller
 */
+(UIViewController *)getCurrentShowViewController;


@end
