export interface NetworkInfo {
  name: string;
  limited: boolean;
  reachable: boolean;
  proxy: string;
  proxy_randomize_credentials: boolean;
}

export interface LocalAddress {
  address: string;
  port: number;
  score: number;
}

export interface BlockchainInfo {
  chain: string;
  blocks: number;
  headers: number;
  bestblockhash: string;
  difficulty: number;
  time: number;
  mediantime: number;
  verificationprogress: number;
  initialblockdownload: boolean;
  chainwork: string;
  size_on_disk: number;
  pruned: boolean;
  warnings: string;
}

export interface NetworkInfoResponse {
  version: number;
  subversion: string;
  protocolversion: number;
  localservices: string;
  localservicesnames: string[];
  localrelay: boolean;
  timeoffset: number;
  networkactive: boolean;
  connections: number;
  connections_in: number;
  connections_out: number;
  networks: NetworkInfo[];
  relayfee: number;
  incrementalfee: number;
  localaddresses: LocalAddress[];
  warnings: string;
}

export interface MempoolInfo {
  loaded: boolean;
  size: number;
  bytes: number;
  usage: number;
  total_fee: number;
  maxmempool: number;
  mempoolminfee: number;
  minrelaytxfee: number;
  incrementalrelayfee: number;
  unbroadcastcount: number;
  fullrbf: boolean;
}

export interface BitcoinSummaryInfo {
  blockchain: BlockchainInfo;
  network: NetworkInfoResponse;
  mempool: MempoolInfo;
}

export interface BlockTransaction {
  hash: string;
}

export interface Block {
  hash: string;
  confirmations: number;
  height: number;
  version: number;
  versionHex: string;
  merkleroot: string;
  time: number;
  mediantime: number;
  nonce: number;
  bits: string;
  difficulty: number;
  chainwork: string;
  nTx: number;
  previousblockhash: string;
  strippedsize: number;
  size: number;
  weight: number;
  tx: string[];
}

export interface PaginatedBlocksResponse {
  blocks: Block[];
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  nextPageHeight?: number;
  pageSize: number;
}

export interface BlockQueryParams {
  page?: number;
  pageSize?: number;
  startHeight?: number;
}

export interface ScriptPubKey {
  asm: string;
  desc: string;
  hex: string;
  address?: string;
  type: string;
}

export interface TransactionInput {
  coinbase?: string;
  txinwitness?: string[];
  sequence: number;
}

export interface TransactionOutput {
  value: number;
  n: number;
  scriptPubKey: ScriptPubKey;
}

export interface Transaction {
  txid: string;
  hash: string;
  version: number;
  size: number;
  vsize: number;
  weight: number;
  locktime: number;
  vin: TransactionInput[];
  vout: TransactionOutput[];
  hex: string;
  blockhash: string;
  confirmations: number;
  time: number;
  blocktime: number;
}