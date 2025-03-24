// import nodemailer from 'nodemailer';
const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
    // host: "smtp.ethereal.email",
    // Tôi sử dụng gmail google nên host của tôi là smtp.gmail.com
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
        user: process.env.USER_EMAIL, // generated ethereal user
        pass: process.env.PASS_EMAIL,  // generated ethereal password
    },
});

export const handleSendMail = async (data: {
    from?: string;
    to: string; // list of receivers
    subject: string; // Subject line
    text?: string; // plain text body
    html: string; // html body
}) => {
    // hàm const info = await gì đó thì mới dùng trycatch (trycatch xong khởi tạo biến gì đó đó)
    try {
        const res = await transporter.sendMail({
            ...data,
            from: data.from ?? 'jonnguyen1572@gmail.com',
            text: 'Hello',
        });

        // console.log(res);
        return res;
    } catch (error: any) {
        throw new Error(error.message)
    }
};