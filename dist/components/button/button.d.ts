import React from 'react';
import { ButtonProps as AntdButtonProps } from 'antd/es/button';
export declare type ButtonProps = AntdButtonProps & {
    warning?: boolean;
    success?: boolean;
};
/**
 * Add new color options (waring/success) to the default ant design buttons (https://ant.design/components/button/).
 */
export declare const Button: React.FC<ButtonProps>;
export default Button;
