import conf from '../config/config.js'
import { Client, Account, ID } from "appwrite";

export class AuthService{
    client = new Client();
    account;

    constructor(){
        this.client
                .setEndpoint(conf.appwriteUrl) // API Endpoint
                .setProject(conf.appwriteProjectId) // Project ID
        
        this.account = new Account(this.client);
    }

    async createAccount({email,password,name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if(userAccount){
                alert("Account created");
                // call another method to login
                // this.login(email,password);
                return (true);
            }
            else{
                return (false);
            }
            
        } catch (error) {
            console.log("Appwrite error :: createAccount :: ",error);
            const msg = String(error);
            alert(msg.substring(19));
            return (false);
        }
    }

    async login({email,password}){
        try {
            const session = await this.account.createEmailSession(email,password);
            return session;
            
        } catch (error) {
            console.log('Appwrite error :: login :: ',error);
            const msg = String(error);
            alert(msg.substring(19));
            return (false);
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
            
        } catch (error) {
            console.log("Appwrite error :: getCurrentUser :: ",error);
            return (null);
        }

        return (null);
    }

    async logout() {
        try {
            await this.account.deleteSessions();
            return (true);
        } catch (error) {
            console.log("Appwrite error :: logout :: ", error);
            return (false);
        }
    }

    async createEmailVerification({url}){
        try {
            return await this.account.createVerification(url);
            
        } catch (error) {
            console.log("Appwrite error :: createEmailVerification :: ", error);
            const msg = String(error);
            alert(msg.substring(19));
            return (false);
        }
    }

    async updateEmail({email,password}) {
        try{
            if(email === '' || password === '') return (null);
            return await this.account.updateEmail(email,password);
        }
        catch(error){
            console.log("Appwrite error :: updateEmail :: ", error);
            const msg = String(error);
            alert(msg.substring(19));
            return (null);
        }
    }

    async updatePassword({newPassword,oldPassword}) {
        try{
            return await this.account.updatePassword(newPassword,oldPassword);
        }
        catch(error){
            console.log("Appwrite error :: updatePassword :: ", error);
            const msg = String(error);
            alert(msg.substring(19));
            return (null);
        }
    }

    async updateUsername({name}) {
        try{
            if(name === '') return (null);
            return await this.account.updateName(name);
        }
        catch(error){
            console.log("Appwrite error :: updateName :: ", error);
            return (null);
        }
    }

}

const authService = new AuthService();

export default authService;
