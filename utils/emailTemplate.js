const createNotificationTemplate = (name, content, link) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Notification</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f0f2f5;">
        
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f0f2f5; padding: 40px 0;">
            <tr>
                <td align="center">
                    <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); overflow: hidden;">
                        
                        <tr>
                            <td style="background: linear-gradient(135deg, #0061f2 0%, #00bafe 100%); padding: 30px; text-align: center;">
                                <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700; letter-spacing: 1px;">THÔNG BÁO MỚI</h1>
                            </td>
                        </tr>

                        <tr>
                            <td style="padding: 40px 30px; color: #4a5568; font-size: 16px; line-height: 1.6;">
                                <p style="margin: 0 0 15px 0; font-size: 18px; color: #1a202c;">Chào <strong>${name}</strong>,</p>
                                <p style="margin: 0;">${content}</p>
                            </td>
                        </tr>

                        <tr>
                            <td align="center" style="padding-bottom: 40px;">
                                <a href="${link}" style="background-color: #0061f2; color: #ffffff; padding: 14px 32px; text-decoration: none; border-radius: 50px; font-weight: 600; font-size: 16px; display: inline-block; box-shadow: 0 4px 6px rgba(0, 97, 242, 0.3);">
                                    Truy cập ngay
                                </a>
                            </td>
                        </tr>

                        <tr>
                            <td style="background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
                                <p style="margin: 0; color: #a0aec0; font-size: 12px;">© 2025 Your Company. All rights reserved.</p>
                            </td>
                        </tr>

                    </table>
                </td>
            </tr>
        </table>

    </body>
    </html>
    `;
};

module.exports = createNotificationTemplate;