import { Controller, Get, Route, Tags, Security, OperationId } from "tsoa";
import { StatusCodes } from "http-status-codes";
import { BitcoinService } from "../services/bitcoin-service";
import { BitcoinAllInfo } from "../services/models/btc-models";

@Route("/api/v1/btc")
@Tags("Bitcoin")
export class BitcoinController extends Controller {
  @Get("info")
  @Security("jwt")
  @OperationId("getBlockchainInfo")
  public async getBlockchainInfo(): Promise<BitcoinAllInfo> {
    console.log("[BitcoinController] Getting Bitcoin info...");
    const service = new BitcoinService();
    const info = await service.getAllInfo();
    console.log("[BitcoinController] Successfully retrieved Bitcoin info:", {
      blockchain: {
        chain: info.blockchain.chain,
        blocks: info.blockchain.blocks,
      },
      network: {
        connections: info.network.connections,
        version: info.network.version,
      },
      mempool: {
        size: info.mempool.size,
        total_fee: info.mempool.total_fee,
      },
    });
    this.setStatus(StatusCodes.OK);
    return info;
  }
}
