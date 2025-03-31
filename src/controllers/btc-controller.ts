import { Controller, Get, Route, Tags, Security, OperationId } from "tsoa";
import { StatusCodes } from "http-status-codes";
import { BitcoinService } from "../services/bitcoin-service";

@Route("/api/v1/bitcoin")
@Tags("Bitcoin")
export class BitcoinController extends Controller {
  @Get("info")
  @Security("jwt")
  @OperationId("getBlockchainInfo")
  public async getBlockchainInfo(): Promise<any> {
    const service = new BitcoinService();
    const info = await service.getBlockchainInfo();
    this.setStatus(StatusCodes.OK);
    return info;
  }
}
