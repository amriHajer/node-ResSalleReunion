const nodemailer =require ("nodemailer");
const transporter =nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"huimlisamar@gmail.com",
        pass:"gjrg bqfx swse dauj"
        // pass:"ynhm evjj zhih jbjz";   //node test

    }
});

const mailOptions ={
    from :"huimlisamar@gmail.com",
    to :"hajer.amri93@gmail.com",
    subject :"Nodemailer Test",
    text:"Test Sending Gmail using Node JS"
};

transporter.sendMail(mailOptions , function(error,info){
    if(error){
        console.log(error);
    }else{
        console.log("Email sent :" +info.response)
    }

});