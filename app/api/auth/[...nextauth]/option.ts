import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs'
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/app/model/User";


export const authOption:NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id:'credentials',
            name: "Credentials",
            credentials:{
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
              },
        async authorize(credentials:any):Promise<any> {
            await dbConnect()
            try {
                const user = await UserModel.findOne({
                    email: credentials.identifier,
                })

                if(!user?.isVerified) {
                    throw new Error('Please verify your account first')
                }

                const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)

                if(isPasswordCorrect) {
                    return user
                }else {
                    throw new Error('Password is Incorrect')
                }

            } catch (error: any) {
                throw new Error(error)
            }
        }
        })
    ],
    callbacks:{
        async session({session, token, user}) {
            if(token) {
                session.user._id = token._id
                session.user.isVerified = token.isVerified
                session.user.username = token.username,
                session.user.email = token.email
            }
            return session
        },
        async jwt({user, token, session}) {
            if(user) {
                token._id = user._id?.toString()
                token.isVerfied= user.isVerified;
                token.username = user.username;
                token.email= user.email
            }
                    return token
        }
            },
            pages: {
                signIn:'/sign-in'
            },
            session: {
                strategy:"jwt",
            },
            secret:process.env.NEXTAUTH_SECRET_KEY
}