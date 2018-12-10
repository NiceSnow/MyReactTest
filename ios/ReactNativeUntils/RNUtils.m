//
//  RNURLQueryUtils.m
//  JinhuiCentury
//
//  Created by lang on 2018/11/13.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "RNUtils.h"

@implementation RNUtils

+ (NSString *)getURLQueryParam:(NSString *)name urlString:(NSString *)urlString{
    
    NSURLComponents *components = [NSURLComponents componentsWithString:urlString];

    for (NSURLQueryItem *item in components.queryItems) {
        if ([item.name isEqualToString:name]) {
            return item.value;
        }
    }
    return nil;
}

+ (NSDictionary *)getURLComponentWithUrlString:(NSString *)urlString{
    
    NSURLComponents *components = [NSURLComponents componentsWithString:urlString];
    
    return @{@"scheme":components.scheme,
             @"user":components.user,
             @"password":components.password,
             @"host":components.host,
             @"port":components.port,
             @"path":components.path,
             @"query":components.query,
             @"fragment":components.fragment,
             @"queryItems":components.queryItems,
             };
}

@end
