//
//  GQIKonwDialog.m
//  JinhuiCentury
//
//  Created by lang on 2018/10/19.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "GQIKnowDialog.h"

@interface GQIKnowDialog ()

@property (weak, nonatomic) IBOutlet UILabel *messageLabel;


@end

@implementation GQIKnowDialog

/*
// Only override drawRect: if you perform custom drawing.
// An empty implementation adversely affects performance during animation.
- (void)drawRect:(CGRect)rect {
    // Drawing code
}
*/

- (void)awakeFromNib{
    [super awakeFromNib];
    self.layer.cornerRadius = 4;
    
}

//- (CGSize)intrinsicContentSize{
//    [super intrinsicContentSize];
//    return CGSizeMake([UIScreen mainScreen].bounds.size.width - 80, 100);
//}
- (IBAction)buttonAction:(UIButton *)sender {
    if (self.buttonAction) {
        self.buttonAction();
    }
}

- (void)setMessage:(NSString *)message{
    _message = [message copy];
    self.messageLabel.text = message;
}

@end
