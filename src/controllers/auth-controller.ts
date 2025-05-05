import { StatusCodes } from "http-status-codes";

import { Body, Controller, OperationId, Post, Request, Route, Security, Tags } from "tsoa";

import {
  LoginParams,
  RefreshParams,
  UserAndCredentials,
  UserCreationParams,
} from "../services/models/auth-models";
import { AuthService } from "../services/auth-service";
import AuthenticatedUser from "src/middleware/models/authenticated-user";
import { Request as ExpressRequest } from "express";

@Route("/api/v1/auth")
@Tags("Auth")
export class AuthController extends Controller {
  @Post("register")
  @OperationId("registerUser")
  public async register(
    @Body() requestBody: UserCreationParams
  ): Promise<UserAndCredentials> {
    console.log(`/api/v1/auth/register called, body: ${JSON.stringify(requestBody)}`);
    this.setStatus(StatusCodes.CREATED);
    return new AuthService().register(requestBody);
  }

  @Post("login")
  @OperationId("loginUser")
  public async login(
    @Body() requestBody: LoginParams
  ): Promise<UserAndCredentials> {
    console.log(`/api/v1/auth/login called, body: ${JSON.stringify(requestBody)}`);
    this.setStatus(StatusCodes.OK);
    return new AuthService().login(requestBody);
  }

  @Post("refresh")
  @Security("jwt_without_verification")
  @OperationId("refreshUser")
  public async refresh(
    @Request() request: ExpressRequest,
    @Body() requestBody: RefreshParams
  ): Promise<UserAndCredentials> {
    console.log(`/api/v1/auth/refresh called, body: ${JSON.stringify(requestBody)}`);
    this.setStatus(StatusCodes.OK);
    const user = request.user as AuthenticatedUser;
    return new AuthService().refresh(requestBody, user);
  }
}
