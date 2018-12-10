//
//  GQIKonwDialog.h
//  JinhuiCentury
//
//  Created by lang on 2018/10/19.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface GQIKnowDialog : UIView

@property (nonatomic, copy)NSString *message;
@property (nonatomic, copy)void (^buttonAction)();

@end

NS_ASSUME_NONNULL_END
