/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Account = {
  __typename?: 'Account';
  /** Description for account */
  description?: Maybe<Scalars['String']['output']>;
  /** Account handle, identifier for the account */
  handle?: Maybe<Scalars['String']['output']>;
  /** ID of the account */
  id: Scalars['ID']['output'];
  /** Url for the profile image */
  imageUrl?: Maybe<Scalars['String']['output']>;
  /** Links associated with account */
  links: Array<Link>;
  /** Name associated with account */
  name: Scalars['String']['output'];
};

/** Bid represents a bid that has been placed. */
export type Bid = {
  __typename?: 'Bid';
  /** Amount of bid in minor currency unit. */
  amount: Scalars['Int']['output'];
  /** Bid status of for the bid */
  bidStatus?: Maybe<BidStatus>;
  /**
   * User Identifier.
   * Controlled in ManagementAPI for the SaleItem owning the bid.
   * Can be userID, randomIdentifier or null.
   * Default null
   */
  bidderIdentifier?: Maybe<Scalars['String']['output']>;
  /** Date of when the bid was placed. */
  date: Scalars['String']['output'];
  /** Id of the item */
  itemId: Scalars['String']['output'];
  /** Max amount placed with the bid in minor currency unit. */
  maxAmount?: Maybe<Scalars['Int']['output']>;
  /** Id of the sale */
  saleId: Scalars['String']['output'];
};

/** Error code when failing to place a bid on an item */
export enum BidErrorCode {
  AlreadyHigherMaxBid = 'ALREADY_HIGHER_MAX_BID',
  BidAmountUpperLimitReached = 'BID_AMOUNT_UPPER_LIMIT_REACHED',
  BidLowerThanCurrentBid = 'BID_LOWER_THAN_CURRENT_BID',
  BidLowerThanCurrentMax = 'BID_LOWER_THAN_CURRENT_MAX',
  InternalError = 'INTERNAL_ERROR',
  ItemClosingPeriodPassed = 'ITEM_CLOSING_PERIOD_PASSED',
  MaxBidLowerThanCurrentMax = 'MAX_BID_LOWER_THAN_CURRENT_MAX',
  NotOpenForBidding = 'NOT_OPEN_FOR_BIDDING',
  NoError = 'NO_ERROR',
  OffIncrement = 'OFF_INCREMENT',
  StartingBidHigher = 'STARTING_BID_HIGHER'
}

/**
 * Bid increment table represent how increments behave for a
 * specific item or an sale.
 */
export type BidIncrementTable = {
  __typename?: 'BidIncrementTable';
  /** Range rules in the table. */
  rangeRules: Array<RangeRule>;
};

export type BidPlaced = BidPlacedError | BidPlacedSuccess | MaxBidPlacedSuccess;

export type BidPlacedError = {
  __typename?: 'BidPlacedError';
  /** Error description if an error occured. */
  error: Scalars['String']['output'];
  /** Error code if an error occured */
  errorCode: BidErrorCode;
};

/**
 * Bid is placed response.
 * Error will only appear if there was an error placing a bid, such as off increment etc.
 */
export type BidPlacedSuccess = {
  __typename?: 'BidPlacedSuccess';
  /** Amount of placed bid. */
  amount: Scalars['Int']['output'];
  /** Bid Status of the bid */
  bidStatus: BidStatus;
  /** Server time of when the bid was placed. */
  date: Scalars['String']['output'];
};

/** Bid statuses that calculates in what status the bid is. */
export enum BidStatus {
  /** User is losing the item. */
  Losing = 'LOSING',
  /** User has lost the item. */
  Lost = 'LOST',
  /** User is not bidding on the item. */
  NotBidding = 'NOT_BIDDING',
  /** User has submitted an offer for the item. */
  Submitted = 'SUBMITTED',
  /** User is winning the item. */
  Winning = 'WINNING',
  /** User has withdrawn an offer for the item. */
  Withdrawn = 'WITHDRAWN',
  /** User has won the item. */
  Won = 'WON'
}

/** Bid Type represent what kind of bid is being placed on an item. */
export enum BidType {
  /**
   * Bid is the highest amount a user is willing to pay. The auction
   * engine will automatically place the lowest bid necessary on behalf
   * of the user until the max amount is reached.
   */
  Max = 'MAX',
  /** Bid is a normal bid. */
  Normal = 'NORMAL',
  /** Bid is an offer that the user commits to buying the item for. */
  Offer = 'OFFER'
}

export type BidderVerificationInput = {
  /** failed verification or if session is left wil send user to the cancelUrl */
  cancelUrl: Scalars['String']['input'];
  /** successful verification is redirected to this url */
  successUrl: Scalars['String']['input'];
};

export type BidderVerificationLink = {
  __typename?: 'BidderVerificationLink';
  /** Redirection link to verification url */
  url: Scalars['String']['output'];
};

/** ClosingMethod represents how SaleItems are moved into CLOSING status and when they are CLOSED */
export enum ClosingMethod {
  /**
   * No sniping.
   * All items close at the same time as the sale
   */
  None = 'NONE',
  /**
   * Only one item is in status CLOSING at a time.
   * Other items wait in status OPEN.
   */
  OneByOne = 'ONE_BY_ONE',
  /**
   * Each item has a precalculated closing time.
   * Items may be in closing at the same time.
   */
  Overlapping = 'OVERLAPPING'
}

/** Input parameters to get all bids for userId */
export type GetUserBidsInput = {
  __typename?: 'GetUserBidsInput';
  after?: Maybe<Scalars['String']['output']>;
  first: Scalars['Int']['output'];
  userId: Scalars['String']['output'];
};

/** Image object */
export type Image = {
  __typename?: 'Image';
  /** ID of the image, UUID string */
  id: Scalars['String']['output'];
  /** DisplayOrder for image */
  order: Scalars['Int']['output'];
  /** Image URL */
  url: Scalars['String']['output'];
};

/** An item (can be associcated with a sale or not) */
export type Item = Node & {
  __typename?: 'Item';
  /** Bid status of currently logged in user for this item */
  bidStatus?: Maybe<BidStatus>;
  /** Get list of bids for this item */
  bids: Array<Bid>;
  /** Current bid amount for the item in minor currency unit. */
  currentBid?: Maybe<Scalars['Int']['output']>;
  /** Closing start and end timestamps if the item is closing */
  dates?: Maybe<ItemDates>;
  /** Item Description */
  description?: Maybe<Scalars['String']['output']>;
  /** Id of an item. */
  id: Scalars['ID']['output'];
  /** Images attached to sale */
  images: Array<Image>;
  /** Overridden increment table for the item. */
  incrementTable?: Maybe<BidIncrementTable>;
  /**
   * DEPRECATED.
   * Closing timestamp if the item is closing
   * @deprecated itemDates is deprecated. Use dates instead.
   */
  itemDates?: Maybe<ItemDates>;
  /** Next 10 asks for the item in minor currency unit. */
  nextAsks: Array<Scalars['Int']['output']>;
  /** Was there an accepted bid that met the reserve price */
  reserveMet: Scalars['Boolean']['output'];
  /** The id of the sale that this item is associated to. */
  saleId: Scalars['String']['output'];
  /** Starting bid of the item in minor currency unit. */
  startingBid?: Maybe<Scalars['Int']['output']>;
  /** Status of the item */
  status: ItemStatus;
  /** Item title */
  title?: Maybe<Scalars['String']['output']>;
  /** Number of bids that have been placed on the item */
  totalBids: Scalars['Int']['output'];
  /** Get list of bids for this item that is placed by the logged in user. */
  userBids: Array<Bid>;
};


/** An item (can be associcated with a sale or not) */
export type ItemNextAsksArgs = {
  iterations?: InputMaybe<Scalars['Int']['input']>;
};

export type ItemChanged = Item | ServerTime;

export type ItemDates = {
  __typename?: 'ItemDates';
  closingEnd?: Maybe<Scalars['String']['output']>;
  closingStart?: Maybe<Scalars['String']['output']>;
};

/** Item statuses for items in a sale */
export enum ItemStatus {
  ItemClosed = 'ITEM_CLOSED',
  ItemClosing = 'ITEM_CLOSING',
  ItemNotOpen = 'ITEM_NOT_OPEN',
  ItemOpen = 'ITEM_OPEN',
  ItemPaused = 'ITEM_PAUSED',
  ItemProcessing = 'ITEM_PROCESSING'
}

export type ItemsConnection = {
  __typename?: 'ItemsConnection';
  /** Item edges */
  edges: Array<ItemsEdge>;
  /** Current page information */
  pageInfo: PageInfo;
};

export type ItemsEdge = {
  __typename?: 'ItemsEdge';
  /** Current item cursor */
  cursor: Scalars['String']['output'];
  /** Item node */
  node: Item;
};

export type Link = {
  __typename?: 'Link';
  type: LinkType;
  url: Scalars['String']['output'];
};

export enum LinkType {
  Instagram = 'INSTAGRAM',
  Tiktok = 'TIKTOK',
  Website = 'WEBSITE',
  Youtube = 'YOUTUBE'
}

export type MaxBidPlaced = BidPlacedError | MaxBidPlacedSuccess;

/**
 * Bid is placed response.
 * Error will only appear if there was an error placing a bid, such as off increment etc.
 */
export type MaxBidPlacedSuccess = {
  __typename?: 'MaxBidPlacedSuccess';
  /** Current amount of placed bid in minor currency unit. */
  amount: Scalars['Int']['output'];
  /** Bid Status of the bid */
  bidStatus: BidStatus;
  /** Server time of when the bid was placed. */
  date: Scalars['String']['output'];
  /** Max amount of placed bid in minor currency unit. */
  maxAmount: Scalars['Int']['output'];
};

/** Me object keeps information about the logged in user. */
export type Me = {
  __typename?: 'Me';
  /** Accounts for logged in user */
  accounts: Array<Account>;
  /** Get all bids that a user has placed on sales */
  bids: UserBidsConnection;
  /** Unique user id of the logged in user. */
  userId: Scalars['String']['output'];
  /** True if logged in user is a verified Basta bidder */
  verifiedAsBidder: Scalars['Boolean']['output'];
};


/** Me object keeps information about the logged in user. */
export type MeBidsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first: Scalars['Int']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /**
   * AcceptBidderTerms.
   * This method is only available to basta users and front ends written by Basta.
   * Returns a RFC3339 timestamp of when bidder terms were accepted.
   */
  acceptBidderTerms: Scalars['String']['output'];
  /**
   * Place bid on a item for some amount. Can be of type NORMAL, MAX and OFFER.
   * Amount will be the max amount when bid is of type MAX.
   */
  bidOnItem: BidPlaced;
  /**
   * CreateBidderVerification.
   * This method is only available to basta users and front ends written by Basta.
   */
  createBidderVerification: BidderVerificationLink;
  /**
   * DEPRECATED.
   * Use BidOnItem with type input = MAX.
   * Place max bid on a item for some amount.
   * @deprecated maxBidOnItem is deprecated. Use bidOnItem with type as MAX instead.
   */
  maxBidOnItem: MaxBidPlaced;
};


export type MutationBidOnItemArgs = {
  amount: Scalars['Int']['input'];
  itemId: Scalars['String']['input'];
  saleId: Scalars['String']['input'];
  type: BidType;
};


export type MutationCreateBidderVerificationArgs = {
  input?: InputMaybe<BidderVerificationInput>;
};


export type MutationMaxBidOnItemArgs = {
  itemId: Scalars['String']['input'];
  maxAmount: Scalars['Int']['input'];
  saleId: Scalars['String']['input'];
};

export type Node = {
  /** Identification of the node. */
  id: Scalars['ID']['output'];
};

/** Page info for pagination */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** Ending cursor */
  endCursor: Scalars['ID']['output'];
  /** Has next page */
  hasNextPage: Scalars['Boolean']['output'];
  /** Starting cursor */
  startCursor: Scalars['ID']['output'];
};

export type PaymentSession = {
  __typename?: 'PaymentSession';
  /** PaymentSession status */
  status: PaymentSessionStatus;
  /** Redirection link to payment session url */
  url: Scalars['String']['output'];
};

export type PaymentSessionInput = {
  /** accountId */
  accountId: Scalars['String']['input'];
  /** Item identifier. */
  itemId: Scalars['String']['input'];
  /** Sale identifier. */
  saleId: Scalars['String']['input'];
};

export enum PaymentSessionStatus {
  Completed = 'COMPLETED',
  Failed = 'FAILED',
  NotSet = 'NOT_SET',
  Processing = 'PROCESSING',
  Started = 'STARTED'
}

export enum Permission {
  AccessPrivate = 'ACCESS_PRIVATE',
  BidOnItem = 'BID_ON_ITEM'
}

export type Query = {
  __typename?: 'Query';
  /** Get account information given an accountId */
  account: Account;
  /** Get account information given an account handle. */
  accountByHandle: Account;
  /** Get all bids that a user has placed on sales */
  bids: UserBidsConnection;
  /** Get information about the logged in user. */
  me: Me;
  /** This method is only available to basta users and front ends written by Basta */
  paymentSession: PaymentSession;
  /** Get information about an sale. */
  sale: Sale;
  /** Get current server time. */
  serverTime: ServerTime;
};


export type QueryAccountArgs = {
  id: Scalars['String']['input'];
};


export type QueryAccountByHandleArgs = {
  handle: Scalars['String']['input'];
};


export type QueryBidsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first: Scalars['Int']['input'];
  userId: Scalars['String']['input'];
};


export type QueryPaymentSessionArgs = {
  input?: InputMaybe<PaymentSessionInput>;
};


export type QuerySaleArgs = {
  id: Scalars['String']['input'];
};

/**
 * Range rule explains increments in the table.
 * Each amount should be in its minor currency unit.
 * The range rule [highRange: $1000, lowRange: $0, step: $25] would be
 *   [highRange: 100000, lowRange: 0, step: 2500]
 */
export type RangeRule = {
  __typename?: 'RangeRule';
  /** High range of the rule */
  highRange: Scalars['Int']['output'];
  /** Low range of the rule */
  lowRange: Scalars['Int']['output'];
  /** Step of the rule */
  step: Scalars['Int']['output'];
};

/** Sale */
export type Sale = Node & {
  __typename?: 'Sale';
  /** Account ID associated with the sale */
  accountId: Scalars['String']['output'];
  /** Closing method. */
  closingMethod: ClosingMethod;
  /**
   * Currency of the sale (capital letters: EUR, USD, etc.)
   * This is the default currency.
   * Item currency overrides sale currency, at least one of them needs to be defined.
   */
  currency?: Maybe<Scalars['String']['output']>;
  /** Sale Dates */
  dates: SaleDates;
  /** Sale Description */
  description?: Maybe<Scalars['String']['output']>;
  /** Sale ID */
  id: Scalars['ID']['output'];
  /** Images attached to sale */
  images: Array<Image>;
  /**
   * Default increment table for the sale.
   * If an increment table is associated with any items in the sale
   * this will be overidden.
   */
  incrementTable?: Maybe<BidIncrementTable>;
  /** Items that have been associated with this sale. */
  items: ItemsConnection;
  /** Sequence number of this sale. */
  sequenceNumber: Scalars['Int']['output'];
  /** Sale status. */
  status: SaleStatus;
  /**
   * Sale theme type.
   * Only used for sales owned by basta.
   */
  themeType?: Maybe<Scalars['Int']['output']>;
  /** Sale Title */
  title?: Maybe<Scalars['String']['output']>;
};


/** Sale */
export type SaleItemsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
};

export type SaleChanged = Sale | ServerTime;

/** Sale Dates */
export type SaleDates = {
  __typename?: 'SaleDates';
  /** Date of when the sale is supposed to be automatically closed. */
  closingDate?: Maybe<Scalars['String']['output']>;
  /** Date of when the sale is supposed to be automatically opened. */
  openDate?: Maybe<Scalars['String']['output']>;
};

/** Sale Status represent what status an sale is currently running in. */
export enum SaleStatus {
  /** Sale is closed for bidding. */
  Closed = 'CLOSED',
  /** Sale is closing. */
  Closing = 'CLOSING',
  /** Sale is opened for bidding. */
  Opened = 'OPENED',
  /** Sale is paused. */
  Paused = 'PAUSED',
  /** Sale is being processed. */
  Processing = 'PROCESSING',
  /** Sale has been published but is not opened for bidding. */
  Published = 'PUBLISHED',
  /** Sale has not been published. This status will never appear in the API expcept when you are previewing the sale. */
  Unpublished = 'UNPUBLISHED'
}

export type ServerTime = {
  __typename?: 'ServerTime';
  /** Current Time */
  currentTime: Scalars['Int']['output'];
};

export type Subscription = {
  __typename?: 'Subscription';
  /**
   * Item changed subscription sends real-time information about changes
   * that happen to a item:
   * * When a bid is placed on a item
   * Server time will be sent also for syncronizing clocks with clients and server.
   */
  itemChanged: ItemChanged;
  /**
   * Sale changed subscription send real-time information about changes
   * that happen on a sale:
   * * Changes to information for an sale such as dates, states, or a item is assigned to an sale or reordering has taken place.
   * Server time will be sent also for syncronizing clocks with clients and server.
   * Note: items will not be populated with those events.
   */
  saleChanged: SaleChanged;
  /** Periodic server time updates to syncronize clocks in applications using Basta. */
  serverTimeChanged: ServerTime;
};


export type SubscriptionItemChangedArgs = {
  itemIds: Array<Scalars['ID']['input']>;
  saleId: Scalars['ID']['input'];
};


export type SubscriptionSaleChangedArgs = {
  saleId: Scalars['ID']['input'];
};

/** A UserBid represents a single bid */
export type UserBid = Node & {
  __typename?: 'UserBid';
  amount: Scalars['Int']['output'];
  bidDate: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  itemId: Scalars['String']['output'];
  maxAmount: Scalars['Int']['output'];
  saleId: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

export type UserBidsConnection = {
  __typename?: 'UserBidsConnection';
  /** UserBids edges */
  edges: Array<UserBidsEdge>;
  /** Current page information */
  pageInfo: PageInfo;
};

export type UserBidsEdge = {
  __typename?: 'UserBidsEdge';
  /** Current UserBid cursor */
  cursor: Scalars['String']['output'];
  /** UserBid node */
  node: UserBid;
};
