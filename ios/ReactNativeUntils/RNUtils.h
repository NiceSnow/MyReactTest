//
//  RNURLQueryUtils.h
//  JinhuiCentury
//
//  Created by lang on 2018/11/13.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface RNUtils : NSObject

+ (NSString *)getURLQueryParam:(NSString *)name urlString:(NSString *)urlString;

@end

NS_ASSUME_NONNULL_END
