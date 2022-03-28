import { Request, Response, NextFunction } from 'express';

declare var auth: any;
declare var compare: any;
/**
 * @description Middleware to authenticate users
 * @param {*} options - options object with the following properties: users and challenge
 * @returns
 */
declare function nubAuth(options: object): (req: Request, res: Response, next: NextFunction) => void;
/**
 * @description function to check if user credentials are valid
 * @param {*} users - users credentials object to check the provided credentials against
 * @param {*} name - provided username credential through basic-auth
 * @param {*} pass - provided password credential through basic-auth
 * @returns - true if credentials are valid, false otherwise
 */
declare function checkit(users: object, name: string, pass: string): boolean;