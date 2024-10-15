
import {Request, Response} from 'express';
import { envs } from '../../config';
import { createServer } from 'http';
import { Server } from '../server';
import AccountsModel from "../../data/models/AccountsModel";
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

class AccountController{
    constructor(){

    }

    async save(req: Request, res: Response){
        try {
                //Validar datos
                const {username,email} = new AccountsModel(req.body);
                if(!username || !email){
                    res.status(400).json({success:false, response: "El usuario y correo son requeridos."}); 
                }
                const user = await AccountsModel.findOne({email});
                if (user) {
                    res.status(401).json({success:false, response: "El correo ya se encuentra en uso."}); 

                }else{
                    //Genera token, correo; para validar cuenta.
                    const token = jwt.sign({email}, envs.JWT_SEED, { expiresIn: envs.TIMEOUT_TOKEN });
                    
                    const httpServer = `${req.protocol}://${req.hostname}:${envs.PORT}/auth/validate-email/${token}>`;
                    // console.log(req.protocol,req.hostname,envs.PORT,req.originalUrl,);

                    //Enviar correo de verificacion de cuenta
                    const transport = nodemailer.createTransport({
                        service: envs.MAILER_SERVICE,
                        auth: {
                            user: envs.MAILER_EMAIL,
                            pass: envs.MAILER_SECRET_KEY
                        }
                    });

                    const mailOptions = {
                        from: envs.MAILER_EMAIL,
                        to: email,
                        subject: 'Validar cuenta',
                        html: `Click en el enlace de abajo para verificar tu cuenta. <br> <a href=${httpServer}>Verificar</a>`
                    }

                    transport.sendMail(mailOptions,(error,info)=>{
                        if(error){
                            res.status(402).json({success:false, error}); 
                        }else{
                            res.status(200).json({success:true, response:"Algo bien"});
                        }
                    });
                    // const data = await AccountsModel.create(newUser);
                    // res.status(200).json({data});
                    
                }
                
        } catch (error) {
            res.status(400).json({success:false, error});
        }
    }
}

export default new AccountController();