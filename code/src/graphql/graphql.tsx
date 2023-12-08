import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  JSON: any;
  Long: any;
  Upload: any;
};

export type AccessView = {
  __typename?: 'AccessView';
  add?: Maybe<Scalars['Int']>;
  delete?: Maybe<Scalars['Int']>;
  update?: Maybe<Scalars['Int']>;
  view?: Maybe<Scalars['Int']>;
};

export type AccessViewInput = {
  add?: InputMaybe<Scalars['Int']>;
  delete?: InputMaybe<Scalars['Int']>;
  update?: InputMaybe<Scalars['Int']>;
  view?: InputMaybe<Scalars['Int']>;
};

export type Address = {
  __typename?: 'Address';
  address_1?: Maybe<Scalars['String']>;
  address_2?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  company?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  first_name?: Maybe<Scalars['String']>;
  last_name?: Maybe<Scalars['String']>;
  owner?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  postcode?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
};

export type AddressInput = {
  address_1?: InputMaybe<Scalars['String']>;
  address_2?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  company?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  first_name?: InputMaybe<Scalars['String']>;
  last_name?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  postcode?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<Scalars['String']>;
};

export type Amazon = {
  __typename?: 'Amazon';
  type?: Maybe<Scalars['String']>;
};

/** input for create or update */
export type AmazonInput = {
  type?: InputMaybe<Scalars['String']>;
};

export type AppConfigAction = {
  __typename?: 'AppConfigAction';
  group?: Maybe<TelegramGroup>;
  id?: Maybe<Scalars['String']>;
  mentions?: Maybe<Array<Maybe<Scalars['String']>>>;
  name?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Boolean']>;
  telegram_mentions?: Maybe<Array<Maybe<TelegramUser>>>;
  url?: Maybe<Scalars['String']>;
};

export type AppConfigActionInput = {
  group?: InputMaybe<TelegramGroupInput>;
  id?: InputMaybe<Scalars['String']>;
  keys?: InputMaybe<Array<InputMaybe<InputAppConfigKey>>>;
  mentions?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  name?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['Boolean']>;
  telegram_mentions?: InputMaybe<Array<InputMaybe<TelegramUserInput>>>;
  times?: InputMaybe<Array<InputMaybe<RemindTimeInput>>>;
  url?: InputMaybe<Scalars['String']>;
};

export type AppConfigKey = {
  __typename?: 'AppConfigKey';
  name?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type Attribute = {
  __typename?: 'Attribute';
  name?: Maybe<Scalars['String']>;
  options?: Maybe<Array<Maybe<Scalars['String']>>>;
  variation?: Maybe<Scalars['Boolean']>;
};

export type AuthDocker = {
  __typename?: 'AuthDocker';
  auth_id?: Maybe<Scalars['String']>;
  current?: Maybe<Scalars['Boolean']>;
  docker?: Maybe<Docker>;
  docker_id?: Maybe<Scalars['String']>;
  groups?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export enum AutoStatus {
  Auto = 'Auto',
  Manual = 'Manual'
}

export type BigCommerce = {
  __typename?: 'BigCommerce';
  access_token?: Maybe<Scalars['String']>;
  admin_email?: Maybe<Scalars['String']>;
  api_path?: Maybe<Scalars['String']>;
  client_id?: Maybe<Scalars['String']>;
  client_secret?: Maybe<Scalars['String']>;
  context?: Maybe<Scalars['String']>;
  currency?: Maybe<Scalars['String']>;
  order_email?: Maybe<Scalars['String']>;
  scope?: Maybe<Scalars['String']>;
  secure_url?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  store_hash?: Maybe<Scalars['String']>;
  store_id?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  user?: Maybe<BigCommerceUser>;
};

export type BigCommerceConfiguration = {
  __typename?: 'BigCommerceConfiguration';
  bigcommerce_access_token?: Maybe<Scalars['String']>;
  bigcommerce_client_id?: Maybe<Scalars['String']>;
  bigcommerce_client_secret?: Maybe<Scalars['String']>;
  bigcommerce_context?: Maybe<Scalars['String']>;
  bigcommerce_scope?: Maybe<Scalars['String']>;
  bigcommerce_store_hash?: Maybe<Scalars['String']>;
  bigcommerce_trust_link?: Maybe<Scalars['String']>;
  bigcommerce_user?: Maybe<BigCommerceUser>;
};

/** input for create or update */
export type BigCommerceInput = {
  access_token: Scalars['String'];
  api_path: Scalars['String'];
  client_id: Scalars['String'];
  client_secret?: InputMaybe<Scalars['String']>;
};

export type BigCommerceTest = {
  __typename?: 'BigCommerceTest';
  message?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
};

export type BigCommerceUser = {
  __typename?: 'BigCommerceUser';
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type Blog = {
  __typename?: 'Blog';
  _id?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['Int']>;
  identity?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['Int']>;
};

export type BlogByStatus = {
  __typename?: 'BlogByStatus';
  all?: Maybe<Scalars['Int']>;
};

export enum CacheControlScope {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type Cart = {
  __typename?: 'Cart';
  _id?: Maybe<Scalars['String']>;
  abandoned_checkout_url?: Maybe<Scalars['String']>;
  alias_id?: Maybe<Scalars['String']>;
  base?: Maybe<Scalars['String']>;
  billing?: Maybe<Address>;
  buyer_id?: Maybe<Scalars['String']>;
  completed_at?: Maybe<Scalars['Int']>;
  created_at?: Maybe<Scalars['Int']>;
  currency?: Maybe<Scalars['String']>;
  custom_id?: Maybe<Scalars['String']>;
  /** prices_include_tax: String */
  customer_note?: Maybe<Scalars['String']>;
  defer_tracking?: Maybe<Scalars['String']>;
  discount_total?: Maybe<Scalars['String']>;
  email_alias?: Maybe<Scalars['String']>;
  estimated_delivery?: Maybe<Scalars['Int']>;
  imported_at?: Maybe<Scalars['Int']>;
  line_items?: Maybe<Array<Maybe<LineItem>>>;
  paid_at?: Maybe<Scalars['Int']>;
  parent?: Maybe<Scalars['String']>;
  payment_method?: Maybe<Scalars['String']>;
  payment_method_title?: Maybe<Scalars['String']>;
  platform?: Maybe<Scalars['String']>;
  platform_id?: Maybe<Scalars['String']>;
  private_note?: Maybe<Scalars['String']>;
  shipping?: Maybe<Address>;
  shipping_lines?: Maybe<Array<Maybe<ShippingLine>>>;
  /** discount_tax: String */
  shipping_total?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  store?: Maybe<Store>;
  store_id?: Maybe<Scalars['String']>;
  /**
   * shipping_tax: String
   * cart_tax: String
   */
  total?: Maybe<Scalars['String']>;
  total_fee?: Maybe<Scalars['String']>;
  total_tax?: Maybe<Scalars['String']>;
  tracking?: Maybe<TrackingType>;
  updated_at?: Maybe<Scalars['Int']>;
};

export type Category = {
  __typename?: 'Category';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
};

export type Clipart = {
  __typename?: 'Clipart';
  _id?: Maybe<Scalars['String']>;
  children?: Maybe<Array<Maybe<ClipartElement>>>;
  created_at?: Maybe<Scalars['Date']>;
  metadata?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  options?: Maybe<Array<Maybe<ClipartOption>>>;
  provider?: Maybe<Scalars['String']>;
  tagName?: Maybe<Scalars['String']>;
  thumb?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['Date']>;
};

export type ClipartElement = {
  __typename?: 'ClipartElement';
  children?: Maybe<Array<Maybe<ClipartElement>>>;
  metadata?: Maybe<Scalars['String']>;
  properties?: Maybe<Array<Maybe<ClipartProperty>>>;
  tagName?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type ClipartFileSigned = {
  __typename?: 'ClipartFileSigned';
  _id?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type ClipartOption = {
  __typename?: 'ClipartOption';
  name?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type ClipartProperty = {
  __typename?: 'ClipartProperty';
  name?: Maybe<Scalars['String']>;
  option_name?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type Collection = {
  __typename?: 'Collection';
  _id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type ComponentSetting = {
  __typename?: 'ComponentSetting';
  name?: Maybe<Scalars['String']>;
  settings?: Maybe<Array<Maybe<EbayTemplateSetting>>>;
  type?: Maybe<Scalars['String']>;
};

export type Configuration = {
  __typename?: 'Configuration';
  ebay_client_id?: Maybe<Scalars['String']>;
  ebay_client_id_sandbox?: Maybe<Scalars['String']>;
  ebay_client_secret?: Maybe<Scalars['String']>;
  ebay_client_secret_sandbox?: Maybe<Scalars['String']>;
  ebay_runame?: Maybe<Scalars['String']>;
  ebay_runame_sandbox?: Maybe<Scalars['String']>;
  ebay_sandbox?: Maybe<Scalars['String']>;
  ebay_trust_link?: Maybe<Scalars['String']>;
  tiktok_trust_link?: Maybe<Scalars['String']>;
};

export type ConsigneeAddress = {
  __typename?: 'ConsigneeAddress';
  address1?: Maybe<Scalars['String']>;
  address2?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
};

export type Coupon = {
  __typename?: 'Coupon';
  _id?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['Int']>;
  fixed_value?: Maybe<Scalars['Boolean']>;
  status?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['Int']>;
  value?: Maybe<Scalars['Float']>;
};

export type Customcat = {
  __typename?: 'Customcat';
  key?: Maybe<Scalars['String']>;
  permissions?: Maybe<Scalars['String']>;
};

/** input for create or update */
export type CustomcatInput = {
  key: Scalars['String'];
};

export type Customer = {
  __typename?: 'Customer';
  _id?: Maybe<Scalars['String']>;
  address_book?: Maybe<Array<Maybe<CustomerAddressType>>>;
  birthday?: Maybe<Scalars['String']>;
  carts?: Maybe<Array<Maybe<Scalars['String']>>>;
  created_at?: Maybe<Scalars['Int']>;
  currency?: Maybe<Scalars['String']>;
  default_address?: Maybe<CustomerAddressType>;
  email?: Maybe<Scalars['String']>;
  first_name?: Maybe<Scalars['String']>;
  group?: Maybe<Scalars['String']>;
  imported_at?: Maybe<Scalars['Int']>;
  is_deleted?: Maybe<Scalars['Boolean']>;
  label?: Maybe<Scalars['String']>;
  last_name?: Maybe<Scalars['String']>;
  note?: Maybe<Scalars['String']>;
  orders?: Maybe<Array<Maybe<Scalars['String']>>>;
  phone?: Maybe<Scalars['String']>;
  platform?: Maybe<Scalars['String']>;
  platform_customer_id?: Maybe<Scalars['String']>;
  purchased_order_total?: Maybe<Scalars['Int']>;
  refunded_order_total?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['String']>;
  store_customers?: Maybe<Array<Maybe<StoreCustomerType>>>;
  stores?: Maybe<Array<Maybe<StoreInfoType>>>;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  total_spent?: Maybe<Scalars['String']>;
  unpaid_order_total?: Maybe<Scalars['Int']>;
  updated_at?: Maybe<Scalars['Int']>;
  user_point?: Maybe<Scalars['String']>;
  verified_email?: Maybe<Scalars['String']>;
};

export type CustomerAddressType = {
  __typename?: 'CustomerAddressType';
  city?: Maybe<Scalars['String']>;
  company?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  default?: Maybe<Scalars['Boolean']>;
  first_name?: Maybe<Scalars['String']>;
  last_name?: Maybe<Scalars['String']>;
  latitude?: Maybe<Scalars['String']>;
  longitude?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
  region_id?: Maybe<Scalars['String']>;
  street?: Maybe<Scalars['String']>;
  street2?: Maybe<Scalars['String']>;
  zipcode?: Maybe<Scalars['String']>;
};

export type CustomerAddressTypeInput = {
  city?: InputMaybe<Scalars['String']>;
  company?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  default?: InputMaybe<Scalars['Boolean']>;
  email?: InputMaybe<Scalars['String']>;
  first_name?: InputMaybe<Scalars['String']>;
  last_name?: InputMaybe<Scalars['String']>;
  latitude?: InputMaybe<Scalars['String']>;
  longitude?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  region?: InputMaybe<Scalars['String']>;
  region_id?: InputMaybe<Scalars['String']>;
  street?: InputMaybe<Scalars['String']>;
  street2?: InputMaybe<Scalars['String']>;
  zipcode?: InputMaybe<Scalars['String']>;
};

export type CustomerGroup = {
  __typename?: 'CustomerGroup';
  _id?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['Int']>;
};

export type CustomerInput = {
  _id?: InputMaybe<Scalars['String']>;
  address_book?: InputMaybe<Array<InputMaybe<CustomerAddressTypeInput>>>;
  birthday?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['Int']>;
  default_address?: InputMaybe<CustomerAddressTypeInput>;
  email?: InputMaybe<Scalars['String']>;
  first_name?: InputMaybe<Scalars['String']>;
  group?: InputMaybe<Scalars['String']>;
  label?: InputMaybe<Scalars['String']>;
  last_name?: InputMaybe<Scalars['String']>;
  note?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  stores?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  updated_at?: InputMaybe<Scalars['Int']>;
  user_point?: InputMaybe<Scalars['String']>;
  verified_email?: InputMaybe<Scalars['String']>;
};

export type CustomerSegment = {
  __typename?: 'CustomerSegment';
  _id?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['Int']>;
  customers?: Maybe<Array<Maybe<Customer>>>;
  filter_conditions?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['Int']>;
};

export type Customizer = {
  __typename?: 'Customizer';
  footerType?: Maybe<Scalars['String']>;
  hideScrollToTop?: Maybe<Scalars['Boolean']>;
  menuTheme?: Maybe<Scalars['String']>;
  navbarColor?: Maybe<Scalars['String']>;
  navbarType?: Maybe<Scalars['String']>;
  sidebarCollapsed?: Maybe<Scalars['Boolean']>;
  theme?: Maybe<Scalars['String']>;
};

export type CustomizerInput = {
  footerType?: InputMaybe<Scalars['String']>;
  hideScrollToTop?: InputMaybe<Scalars['Boolean']>;
  menuTheme?: InputMaybe<Scalars['String']>;
  navbarColor?: InputMaybe<Scalars['String']>;
  navbarType?: InputMaybe<Scalars['String']>;
  sidebarCollapsed?: InputMaybe<Scalars['Boolean']>;
  theme?: InputMaybe<Scalars['String']>;
};

export type DashboardFulfillementProduction = {
  __typename?: 'DashboardFulfillementProduction';
  base?: Maybe<Scalars['Float']>;
  count?: Maybe<Scalars['Int']>;
  data?: Maybe<Array<Maybe<DashboardProductData>>>;
  fulfillment_id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  provider?: Maybe<Scalars['String']>;
  revenue?: Maybe<Scalars['Float']>;
  ship?: Maybe<Scalars['Float']>;
  total?: Maybe<Scalars['Float']>;
};

export type DashboardOrder = {
  __typename?: 'DashboardOrder';
  all?: Maybe<Scalars['Int']>;
  cancelled?: Maybe<Scalars['Int']>;
  completed?: Maybe<Scalars['Int']>;
  fulfilled?: Maybe<Scalars['Int']>;
  indesign?: Maybe<Scalars['Int']>;
  inproduction?: Maybe<Scalars['Int']>;
  pending?: Maybe<Scalars['Int']>;
  processing?: Maybe<Scalars['Int']>;
  refunded?: Maybe<Scalars['Int']>;
  trash?: Maybe<Scalars['Int']>;
};

export type DashboardOrderReport = {
  __typename?: 'DashboardOrderReport';
  data?: Maybe<Array<Maybe<DashboardOrderReportData>>>;
  store_id?: Maybe<Scalars['String']>;
};

export type DashboardOrderReportData = {
  __typename?: 'DashboardOrderReportData';
  base?: Maybe<Scalars['Float']>;
  cost?: Maybe<Scalars['Float']>;
  count?: Maybe<Scalars['Float']>;
  discount?: Maybe<Scalars['Float']>;
  key?: Maybe<Scalars['String']>;
  ship?: Maybe<Scalars['Float']>;
  ship_cost?: Maybe<Scalars['Float']>;
};

export type DashboardPaypal = {
  __typename?: 'DashboardPaypal';
  total_180?: Maybe<Scalars['Float']>;
  total_balance?: Maybe<Scalars['Float']>;
  total_hold?: Maybe<Scalars['Float']>;
};

export type DashboardProductData = {
  __typename?: 'DashboardProductData';
  base?: Maybe<Scalars['Float']>;
  count?: Maybe<Scalars['Float']>;
  key?: Maybe<Scalars['String']>;
  product_types?: Maybe<Array<Maybe<DashboardProductTypes>>>;
  ship?: Maybe<Scalars['Float']>;
};

export type DashboardProductPreset = {
  __typename?: 'DashboardProductPreset';
  all?: Maybe<Scalars['Int']>;
  alloverprint?: Maybe<Scalars['Int']>;
  apparel?: Maybe<Scalars['Int']>;
  canvasposter?: Maybe<Scalars['Int']>;
  facemask?: Maybe<Scalars['Int']>;
  giftaccessories?: Maybe<Scalars['Int']>;
  homedecorations?: Maybe<Scalars['Int']>;
  jewelry?: Maybe<Scalars['Int']>;
};

export type DashboardProductPresetProvider = {
  __typename?: 'DashboardProductPresetProvider';
  all?: Maybe<Scalars['Int']>;
  customcat?: Maybe<Scalars['Int']>;
  dreamship?: Maybe<Scalars['Int']>;
  geargag?: Maybe<Scalars['Int']>;
  gearment?: Maybe<Scalars['Int']>;
  lionnix?: Maybe<Scalars['Int']>;
  merchize?: Maybe<Scalars['Int']>;
  onos?: Maybe<Scalars['Int']>;
  printify?: Maybe<Scalars['Int']>;
  private?: Maybe<Scalars['Int']>;
  scalable?: Maybe<Scalars['Int']>;
};

export type DashboardProductTypeSizes = {
  __typename?: 'DashboardProductTypeSizes';
  base?: Maybe<Scalars['Float']>;
  count?: Maybe<Scalars['Float']>;
  size?: Maybe<Scalars['String']>;
};

export type DashboardProductTypes = {
  __typename?: 'DashboardProductTypes';
  base?: Maybe<Scalars['Float']>;
  /** ship: Float */
  by_size?: Maybe<Array<Maybe<DashboardProductTypeSizes>>>;
  count?: Maybe<Scalars['Float']>;
  type_id?: Maybe<Scalars['String']>;
  type_name?: Maybe<Scalars['String']>;
};

export type DashboardProduction = {
  __typename?: 'DashboardProduction';
  base?: Maybe<Scalars['Float']>;
  count?: Maybe<Scalars['Int']>;
  /** data: [DashboardProductData] */
  fulfillments?: Maybe<Array<Maybe<DashboardFulfillementProduction>>>;
  revenue?: Maybe<Scalars['Float']>;
  ship?: Maybe<Scalars['Float']>;
  store_id?: Maybe<Scalars['String']>;
  total?: Maybe<Scalars['Float']>;
};

export type DashboardProfit = {
  __typename?: 'DashboardProfit';
  base?: Maybe<Scalars['Float']>;
  end?: Maybe<Scalars['String']>;
  index?: Maybe<Scalars['Int']>;
  label?: Maybe<Scalars['String']>;
  profit?: Maybe<Scalars['Float']>;
  ranges?: Maybe<Array<Maybe<DashboardProfit>>>;
  shipping_total?: Maybe<Scalars['Float']>;
  start?: Maybe<Scalars['String']>;
  total?: Maybe<Scalars['Float']>;
  total_fee?: Maybe<Scalars['Float']>;
  total_fee_ad?: Maybe<Scalars['Float']>;
  total_fee_ex?: Maybe<Scalars['Float']>;
  total_fee_ex_refund?: Maybe<Scalars['Float']>;
  total_fee_refund?: Maybe<Scalars['Float']>;
  total_refund?: Maybe<Scalars['Float']>;
  total_tax?: Maybe<Scalars['Float']>;
};

export type DateFollowType = {
  __typename?: 'DateFollowType';
  count_date?: Maybe<Scalars['Int']>;
  last_update?: Maybe<Scalars['String']>;
};

export type Design = {
  __typename?: 'Design';
  _id?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['String']>;
  created_by?: Maybe<User>;
  images?: Maybe<Array<Maybe<FileImage>>>;
  print_files?: Maybe<Array<Maybe<DesignPrintFile>>>;
  sku?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  updated_at?: Maybe<Scalars['String']>;
};

export type DesignPrintFile = {
  __typename?: 'DesignPrintFile';
  _id?: Maybe<Scalars['String']>;
  image?: Maybe<FileImage>;
  /** print file position */
  type?: Maybe<Scalars['String']>;
};

export type DesignPrintFileInput = {
  _id?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  /** print file position */
  type?: InputMaybe<Scalars['String']>;
};

export type DesignTasks = {
  __typename?: 'DesignTasks';
  images?: Maybe<Array<Maybe<FileImage>>>;
  print_files?: Maybe<Array<Maybe<PrintFileItem>>>;
};

export type DesignTicket = {
  __typename?: 'DesignTicket';
  _id?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['String']>;
  created_by?: Maybe<User>;
  description?: Maybe<Scalars['String']>;
  design_sku?: Maybe<Scalars['String']>;
  due_date?: Maybe<Scalars['String']>;
  images?: Maybe<Array<Maybe<FileImage>>>;
  origin_image?: Maybe<Scalars['String']>;
  print_files?: Maybe<Array<Maybe<DesignPrintFile>>>;
  store_id?: Maybe<Scalars['String']>;
  store_line_item_id?: Maybe<Scalars['String']>;
  store_order_id?: Maybe<Scalars['String']>;
  ticket_id?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['String']>;
};

export type Docker = {
  __typename?: 'Docker';
  _id?: Maybe<Scalars['String']>;
  annually?: Maybe<Scalars['Boolean']>;
  created_at?: Maybe<Scalars['Int']>;
  docker_auth?: Maybe<Array<Maybe<DockerAuth>>>;
  domain?: Maybe<Scalars['String']>;
  hiden?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  invite?: Maybe<Array<Maybe<DockerAuthInvite>>>;
  label?: Maybe<Scalars['String']>;
  onos_email?: Maybe<Scalars['String']>;
  plan?: Maybe<Scalars['String']>;
  plan_log?: Maybe<HubPlanLog>;
  server?: Maybe<Scalars['String']>;
  sku?: Maybe<Scalars['String']>;
  sku_label?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  unlimit_lifetime?: Maybe<Scalars['Boolean']>;
};

export type DockerAuth = {
  __typename?: 'DockerAuth';
  auth_id?: Maybe<Scalars['String']>;
  author?: Maybe<Scalars['Boolean']>;
  docker_id?: Maybe<Scalars['String']>;
  groups?: Maybe<Array<Maybe<Scalars['String']>>>;
  user?: Maybe<User>;
};

export type DockerAuthInvite = {
  __typename?: 'DockerAuthInvite';
  _id?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
};

export type DockerUserInput = {
  user_action?: InputMaybe<Scalars['String']>;
  user_confirm_password?: InputMaybe<Scalars['String']>;
  user_email?: InputMaybe<Scalars['String']>;
  user_id?: InputMaybe<Scalars['String']>;
  user_identity_label?: InputMaybe<Scalars['String']>;
  user_invite_email?: InputMaybe<Scalars['String']>;
  user_name?: InputMaybe<Scalars['String']>;
  user_password?: InputMaybe<Scalars['String']>;
};

export type Dreamship = {
  __typename?: 'Dreamship';
  key?: Maybe<Scalars['String']>;
};

/** input for create or update */
export type DreamshipInput = {
  key: Scalars['String'];
};

export type Ebay = {
  __typename?: 'Ebay';
  code?: Maybe<Scalars['String']>;
  expires_in?: Maybe<Scalars['String']>;
  refresh_token?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
};

/** input for create or update */
export type EbayInput = {
  code: Scalars['String'];
};

export type EbayTemplate = {
  __typename?: 'EbayTemplate';
  _id?: Maybe<Scalars['String']>;
  author?: Maybe<User>;
  components?: Maybe<Array<Maybe<EbayTemplateComponent>>>;
  created_at?: Maybe<Scalars['String']>;
  created_by?: Maybe<Scalars['String']>;
  document?: Maybe<Array<Maybe<EbayTemplateSetting>>>;
  name?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  stores?: Maybe<Array<Maybe<Scalars['String']>>>;
  trashed_at?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['String']>;
};

export type EbayTemplateComponent = {
  __typename?: 'EbayTemplateComponent';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  settings?: Maybe<Array<Maybe<EbayTemplateSetting>>>;
};

export type EbayTemplateComponentInput = {
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  settings?: InputMaybe<Array<InputMaybe<EbayTemplateInput>>>;
};

export type EbayTemplateDocumentInput = {
  settings?: InputMaybe<Array<InputMaybe<EbayTemplateInput>>>;
};

export type EbayTemplateInput = {
  name?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

export type EbayTemplatePreview = {
  __typename?: 'EbayTemplatePreview';
  _html?: Maybe<Scalars['String']>;
};

export type EbayTemplateSetting = {
  __typename?: 'EbayTemplateSetting';
  name?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type EbayTransactionSummary = {
  __typename?: 'EbayTransactionSummary';
  funds_available_for_payout?: Maybe<EbayTransactionSummaryDetail>;
  funds_on_hold?: Maybe<EbayTransactionSummaryDetail>;
  funds_processing?: Maybe<EbayTransactionSummaryDetail>;
};

export type EbayTransactionSummaryDetail = {
  __typename?: 'EbayTransactionSummaryDetail';
  currency?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['Float']>;
};

export type Email = {
  __typename?: 'Email';
  _id?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  subject?: Maybe<Scalars['String']>;
  type?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type EmailInput = {
  _id?: InputMaybe<Scalars['String']>;
  content?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  subject?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

export type EmailSetting = {
  __typename?: 'EmailSetting';
  has_complated?: Maybe<Scalars['String']>;
  has_imported?: Maybe<Scalars['String']>;
  has_tracking?: Maybe<Scalars['String']>;
};

export type EmailStore = {
  __typename?: 'EmailStore';
  _id?: Maybe<Scalars['String']>;
  action?: Maybe<Array<Maybe<EmailStoreAction>>>;
  brand_name?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['String']>;
  platform_id?: Maybe<Scalars['String']>;
  sto_auto?: Maybe<Scalars['String']>;
  sto_auto_messenger?: Maybe<Scalars['String']>;
  sto_created_at?: Maybe<Scalars['Int']>;
  sto_name?: Maybe<Scalars['String']>;
  sto_status?: Maybe<Status>;
  sto_type?: Maybe<Scalars['String']>;
  sto_updated_at?: Maybe<Scalars['Int']>;
  sto_user?: Maybe<Scalars['String']>;
  total_order?: Maybe<Scalars['Int']>;
  updated_at?: Maybe<Scalars['Int']>;
};

export type EmailStoreAction = {
  __typename?: 'EmailStoreAction';
  created_at?: Maybe<Scalars['Int']>;
  created_by?: Maybe<Scalars['String']>;
  orderStatus?: Maybe<Array<Maybe<Scalars['String']>>>;
  template?: Maybe<EmailTemplate>;
  total?: Maybe<Scalars['Int']>;
  totalError?: Maybe<Scalars['Int']>;
  totalRunning?: Maybe<Scalars['Int']>;
};

export type EmailTemplate = {
  __typename?: 'EmailTemplate';
  content?: Maybe<Scalars['String']>;
  subject?: Maybe<Scalars['String']>;
};

export type EmailTemplateInput = {
  content?: InputMaybe<Scalars['String']>;
  subject?: InputMaybe<Scalars['String']>;
};

export type EraseImage = {
  __typename?: 'EraseImage';
  image?: Maybe<Scalars['String']>;
};

export type Etsy = {
  __typename?: 'Etsy';
  etsy_keystring?: Maybe<Scalars['String']>;
  etsy_outh_token?: Maybe<Scalars['String']>;
  etsy_outh_token_secret?: Maybe<Scalars['String']>;
  etsy_shared_secret?: Maybe<Scalars['String']>;
  etsy_trust_link?: Maybe<Scalars['String']>;
  expires_in?: Maybe<Scalars['String']>;
  is_supply?: Maybe<Scalars['String']>;
  login_name?: Maybe<Scalars['String']>;
  product_state?: Maybe<Scalars['String']>;
  refresh_token?: Maybe<Scalars['String']>;
  shop_id?: Maybe<Scalars['String']>;
  user_id?: Maybe<Scalars['String']>;
  when_made?: Maybe<Scalars['String']>;
  who_made?: Maybe<Scalars['String']>;
};

export type EtsyConfiguration = {
  __typename?: 'EtsyConfiguration';
  etsy_keystring?: Maybe<Scalars['String']>;
  etsy_outh_token?: Maybe<Scalars['String']>;
  etsy_outh_token_secret?: Maybe<Scalars['String']>;
  etsy_runame?: Maybe<Scalars['String']>;
  etsy_shared_secret?: Maybe<Scalars['String']>;
  etsy_trust_link?: Maybe<Scalars['String']>;
};

/** input for create or update */
export type EtsyInput = {
  etsy_keystring?: InputMaybe<Scalars['String']>;
  etsy_outh_token?: InputMaybe<Scalars['String']>;
  etsy_outh_token_secret?: InputMaybe<Scalars['String']>;
  etsy_shared_secret?: InputMaybe<Scalars['String']>;
  etsy_trust_link?: InputMaybe<Scalars['String']>;
  is_supply?: InputMaybe<Scalars['String']>;
  login_name?: InputMaybe<Scalars['String']>;
  product_state?: InputMaybe<Scalars['String']>;
  shop_id?: InputMaybe<Scalars['String']>;
  user_id?: InputMaybe<Scalars['String']>;
  when_made?: InputMaybe<Scalars['String']>;
  who_made?: InputMaybe<Scalars['String']>;
};

export type EtsyKey = {
  __typename?: 'EtsyKey';
  _id?: Maybe<Scalars['String']>;
  api_calling_limit?: Maybe<Scalars['Int']>;
  authorized_at?: Maybe<Scalars['Int']>;
  created_at?: Maybe<Scalars['Int']>;
  etsy_keystring?: Maybe<Scalars['String']>;
  etsy_outh_token?: Maybe<Scalars['String']>;
  etsy_outh_token_secret?: Maybe<Scalars['String']>;
  etsy_shared_secret?: Maybe<Scalars['String']>;
  etsy_trust_link?: Maybe<Scalars['String']>;
  key_status?: Maybe<Scalars['String']>;
  login_name?: Maybe<Scalars['String']>;
  note?: Maybe<Scalars['String']>;
  platform_user_id?: Maybe<Scalars['String']>;
  shop_id?: Maybe<Scalars['String']>;
  shop_name?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  store_id?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  today_calling_totals?: Maybe<Scalars['Int']>;
  updated_at?: Maybe<Scalars['Int']>;
  user_id?: Maybe<Scalars['String']>;
};

export type EtsyKeyInput = {
  _id?: InputMaybe<Scalars['String']>;
  api_calling_limit?: InputMaybe<Scalars['String']>;
  etsy_keystring?: InputMaybe<Scalars['String']>;
  etsy_shared_secret?: InputMaybe<Scalars['String']>;
  note?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  store_id: Scalars['String'];
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type EtsyKeyRemoveInput = {
  _id?: InputMaybe<Scalars['String']>;
  store_id?: InputMaybe<Scalars['String']>;
};

export type EtsyShipping = {
  __typename?: 'EtsyShipping';
  country_label?: Maybe<Scalars['String']>;
  country_origin?: Maybe<Scalars['String']>;
  default_shipping?: Maybe<EtsyShippingEntry>;
  dispatch_time_max?: Maybe<Scalars['Int']>;
  dispatch_time_min?: Maybe<Scalars['Int']>;
  origin_country_id?: Maybe<Scalars['Int']>;
  shipping_profile_id?: Maybe<Scalars['String']>;
  standard_shipping?: Maybe<Array<Maybe<EtsyShippingEntry>>>;
};

export type EtsyShippingEntry = {
  __typename?: 'EtsyShippingEntry';
  code?: Maybe<Scalars['String']>;
  country_id?: Maybe<Scalars['Int']>;
  label?: Maybe<Scalars['String']>;
  shipping_additional_cost?: Maybe<Scalars['Float']>;
  shipping_cost?: Maybe<Scalars['Float']>;
};

export type EtsyShippingEntryInput = {
  code?: InputMaybe<Scalars['String']>;
  country_id?: InputMaybe<Scalars['Int']>;
  label?: InputMaybe<Scalars['String']>;
  shipping_additional_cost?: InputMaybe<Scalars['Float']>;
  shipping_cost?: InputMaybe<Scalars['Float']>;
};

export type EtsyShippingInput = {
  country_label?: InputMaybe<Scalars['String']>;
  country_origin?: InputMaybe<Scalars['String']>;
  default_shipping?: InputMaybe<EtsyShippingEntryInput>;
  dispatch_time_max?: InputMaybe<Scalars['Int']>;
  dispatch_time_min?: InputMaybe<Scalars['Int']>;
  origin_country_id?: InputMaybe<Scalars['Int']>;
  shipping_profile_id?: InputMaybe<Scalars['String']>;
  standard_shipping?: InputMaybe<Array<InputMaybe<EtsyShippingEntryInput>>>;
};

export type EtsyShippingTemplate = {
  __typename?: 'EtsyShippingTemplate';
  _id?: Maybe<Scalars['String']>;
  entries?: Maybe<Array<Maybe<EtsyShippingTemplateEntry>>>;
  max_processing_days?: Maybe<Scalars['String']>;
  min_processing_days?: Maybe<Scalars['String']>;
  origin_country_id?: Maybe<Scalars['String']>;
  processing_days_display_label?: Maybe<Scalars['String']>;
  shipping_template_id?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  user_id?: Maybe<Scalars['Int']>;
};

export type EtsyShippingTemplateEntry = {
  __typename?: 'EtsyShippingTemplateEntry';
  _id?: Maybe<Scalars['String']>;
  currency_code?: Maybe<Scalars['String']>;
  destination_country_id?: Maybe<Scalars['String']>;
  destination_region_id?: Maybe<Scalars['String']>;
  origin_country_id?: Maybe<Scalars['String']>;
  primary_cost?: Maybe<Scalars['String']>;
  secondary_cost?: Maybe<Scalars['String']>;
  shipping_template_entry_id?: Maybe<Scalars['String']>;
  shipping_template_id?: Maybe<Scalars['String']>;
};

export type EtsyTest = {
  __typename?: 'EtsyTest';
  message?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
};

export type EtsyV3 = {
  __typename?: 'EtsyV3';
  access_token?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
  code_verifier?: Maybe<Scalars['String']>;
  expires_in?: Maybe<Scalars['Int']>;
  refresh_token?: Maybe<Scalars['String']>;
  refresh_token_expires_in?: Maybe<Scalars['Int']>;
};

export type ExtensionRule = {
  __typename?: 'ExtensionRule';
  id?: Maybe<Array<Maybe<ExtensionRuleId>>>;
  images?: Maybe<Array<Maybe<ExtensionRuleImage>>>;
  items?: Maybe<Array<Maybe<ExtensionRuleItems>>>;
  name?: Maybe<Scalars['String']>;
};

export type ExtensionRuleId = {
  __typename?: 'ExtensionRuleId';
  attr?: Maybe<Scalars['String']>;
  block?: Maybe<Scalars['String']>;
};

export type ExtensionRuleImage = {
  __typename?: 'ExtensionRuleImage';
  attr?: Maybe<Array<Maybe<Scalars['String']>>>;
  block?: Maybe<Scalars['String']>;
  loop?: Maybe<Scalars['String']>;
};

export type ExtensionRuleItems = {
  __typename?: 'ExtensionRuleItems';
  block?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  image_attr?: Maybe<Scalars['String']>;
  loop?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  name_attr?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  url_attr?: Maybe<Scalars['String']>;
};

export type ExternalFolderInput = {
  external_folder?: InputMaybe<Scalars['String']>;
  item_id: Scalars['String'];
};

export type File = {
  __typename?: 'File';
  _id?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['String']>;
  created_by?: Maybe<User>;
  /** filename is origin name */
  filename?: Maybe<Scalars['String']>;
  height?: Maybe<Scalars['Float']>;
  image_sizes?: Maybe<Array<Maybe<ImageSize>>>;
  mask?: Maybe<Scalars['String']>;
  mimetype?: Maybe<Scalars['String']>;
  path?: Maybe<Scalars['String']>;
  size?: Maybe<Scalars['Float']>;
  sku?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<FileTag>>>;
  updated_at?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Float']>;
};

export type FileBlob = {
  __typename?: 'FileBlob';
  raw?: Maybe<Scalars['String']>;
};

export type FileImage = {
  __typename?: 'FileImage';
  _id?: Maybe<Scalars['String']>;
  filename?: Maybe<Scalars['String']>;
  height?: Maybe<Scalars['String']>;
  mimetype?: Maybe<Scalars['String']>;
  size?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['String']>;
};

/** COPY FROM seller.onospod.com */
export type FileSigned = {
  __typename?: 'FileSigned';
  _id?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type FileTag = {
  __typename?: 'FileTag';
  name?: Maybe<Scalars['String']>;
};

export type Font = {
  __typename?: 'Font';
  _id?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['Date']>;
  family?: Maybe<Scalars['String']>;
  files?: Maybe<Array<Maybe<FontFile>>>;
  preview?: Maybe<Scalars['String']>;
  provider?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  subsets?: Maybe<Array<Maybe<Scalars['String']>>>;
  updated_at?: Maybe<Scalars['Date']>;
  user_id?: Maybe<Scalars['String']>;
  variants?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type FontFile = {
  __typename?: 'FontFile';
  style?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  variant?: Maybe<Scalars['String']>;
  weight?: Maybe<Scalars['String']>;
};

export type FontFileSigned = {
  __typename?: 'FontFileSigned';
  path?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  variant?: Maybe<Scalars['String']>;
};

export type Fulfilment = {
  __typename?: 'Fulfilment';
  _id?: Maybe<Scalars['String']>;
  auto?: Maybe<AutoStatus>;
  balance?: Maybe<Scalars['Float']>;
  created_at?: Maybe<Scalars['Int']>;
  customcat_config?: Maybe<Customcat>;
  default?: Maybe<Scalars['Boolean']>;
  dreamship_config?: Maybe<Dreamship>;
  geargag_config?: Maybe<Geargag>;
  gearment_config?: Maybe<Gearment>;
  geekpod_config?: Maybe<Geekpod>;
  lenful_config?: Maybe<Lenful>;
  merchize_config?: Maybe<Merchize>;
  name?: Maybe<Scalars['String']>;
  onos_config?: Maybe<Onos>;
  printify_config?: Maybe<Printify>;
  printway_config?: Maybe<Printway>;
  private_config?: Maybe<Private>;
  scalable_config?: Maybe<Scalable>;
  shineon_config?: Maybe<Shineon>;
  status?: Maybe<Status>;
  /** total paid */
  total_paid?: Maybe<Scalars['Float']>;
  type?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['Int']>;
};

export type FulfilmentInput = {
  customcat_config?: InputMaybe<CustomcatInput>;
  dreamship_config?: InputMaybe<DreamshipInput>;
  geargag_config?: InputMaybe<GeargagInput>;
  gearment_config?: InputMaybe<GearmentInput>;
  geekpod_config?: InputMaybe<GeekpodInput>;
  lenful_config?: InputMaybe<LenfulInput>;
  merchize_config?: InputMaybe<MerchizeInput>;
  onos_config?: InputMaybe<OnosInput>;
  printify_config?: InputMaybe<PrintifyInput>;
  printway_config?: InputMaybe<PrintwayInput>;
  private_config?: InputMaybe<PrivateInput>;
  scalable_config?: InputMaybe<ScalableInput>;
  shineon_config?: InputMaybe<ShineonInput>;
};

export type Geargag = {
  __typename?: 'Geargag';
  key?: Maybe<Scalars['String']>;
};

/** input for create or update */
export type GeargagInput = {
  key: Scalars['String'];
};

export type Gearment = {
  __typename?: 'Gearment';
  key?: Maybe<Scalars['String']>;
  signature?: Maybe<Scalars['String']>;
};

/** input for create or update */
export type GearmentInput = {
  key: Scalars['String'];
  signature: Scalars['String'];
};

export type Geekpod = {
  __typename?: 'Geekpod';
  key?: Maybe<Scalars['String']>;
};

/** input for create or update */
export type GeekpodInput = {
  key: Scalars['String'];
};

export type HubPlanLog = {
  __typename?: 'HubPlanLog';
  expires_at?: Maybe<Scalars['Int']>;
  payment_at?: Maybe<Scalars['Int']>;
  plan?: Maybe<Scalars['String']>;
};

export type Image = {
  __typename?: 'Image';
  _id?: Maybe<Scalars['String']>;
  src?: Maybe<Scalars['String']>;
};

export type ImageInput = {
  _id?: InputMaybe<Scalars['String']>;
  height?: InputMaybe<Scalars['String']>;
  size?: InputMaybe<Scalars['String']>;
  url?: InputMaybe<Scalars['String']>;
  width?: InputMaybe<Scalars['String']>;
};

export type ImagePrintFileInput = {
  _id?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

export type ImagePrintSetting = {
  __typename?: 'ImagePrintSetting';
  print_crop_height?: Maybe<Scalars['Float']>;
  print_crop_width?: Maybe<Scalars['Float']>;
  print_crop_x?: Maybe<Scalars['Float']>;
  print_crop_y?: Maybe<Scalars['Float']>;
  print_height?: Maybe<Scalars['Float']>;
  print_knew_x?: Maybe<Scalars['Float']>;
  print_knew_y?: Maybe<Scalars['Float']>;
  print_rotate?: Maybe<Scalars['Float']>;
  print_scale_x?: Maybe<Scalars['Float']>;
  print_scale_y?: Maybe<Scalars['Float']>;
  print_width?: Maybe<Scalars['Float']>;
  print_x?: Maybe<Scalars['Float']>;
  print_y?: Maybe<Scalars['Float']>;
};

export type ImagePrintSettingIput = {
  print_crop_height?: InputMaybe<Scalars['Float']>;
  print_crop_width?: InputMaybe<Scalars['Float']>;
  print_crop_x?: InputMaybe<Scalars['Float']>;
  print_crop_y?: InputMaybe<Scalars['Float']>;
  print_height?: InputMaybe<Scalars['Float']>;
  print_knew_x?: InputMaybe<Scalars['Float']>;
  print_knew_y?: InputMaybe<Scalars['Float']>;
  print_rotate?: InputMaybe<Scalars['Float']>;
  print_scale_x?: InputMaybe<Scalars['Float']>;
  print_scale_y?: InputMaybe<Scalars['Float']>;
  print_width?: InputMaybe<Scalars['Float']>;
  print_x?: InputMaybe<Scalars['Float']>;
  print_y?: InputMaybe<Scalars['Float']>;
};

export type ImageSize = {
  __typename?: 'ImageSize';
  height?: Maybe<Scalars['Float']>;
  mask?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Float']>;
};

export type Info = {
  __typename?: 'Info';
  extension_rule?: Maybe<ExtensionRule>;
  hub_config?: Maybe<Scalars['String']>;
};

export type InputAppConfigKey = {
  name?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

/**
 * All design uploaded via FileUploader component on Frontend
 * Input design only contains { _id, url }
 */
export type InputFile = {
  _id?: InputMaybe<Scalars['String']>;
  height?: InputMaybe<Scalars['Float']>;
  image_sizes?: InputMaybe<Array<InputMaybe<InputImageSize>>>;
  type?: InputMaybe<Scalars['String']>;
  url?: InputMaybe<Scalars['String']>;
  width?: InputMaybe<Scalars['Float']>;
};

export type InputFontFile = {
  path?: InputMaybe<Scalars['String']>;
  style?: InputMaybe<Scalars['String']>;
  url?: InputMaybe<Scalars['String']>;
  variant?: InputMaybe<Scalars['String']>;
  weight?: InputMaybe<Scalars['String']>;
};

export type InputImageSize = {
  height?: InputMaybe<Scalars['Float']>;
  mask?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  url?: InputMaybe<Scalars['String']>;
  width?: InputMaybe<Scalars['Float']>;
};

export type InputMockupFont = {
  family?: InputMaybe<Scalars['String']>;
  files?: InputMaybe<Array<InputMaybe<InputFontFile>>>;
  provider?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
  subsets?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  variants?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type InputMockupInfo = {
  color?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

export type InputMockupPrintDimension = {
  height?: InputMaybe<Scalars['Float']>;
  knewX?: InputMaybe<Scalars['Float']>;
  knewY?: InputMaybe<Scalars['Float']>;
  rotation?: InputMaybe<Scalars['Float']>;
  scaleX?: InputMaybe<Scalars['Float']>;
  scaleY?: InputMaybe<Scalars['Float']>;
  width?: InputMaybe<Scalars['Float']>;
  x?: InputMaybe<Scalars['Float']>;
  y?: InputMaybe<Scalars['Float']>;
};

export type InputMockupPrintDocument = {
  height?: InputMaybe<Scalars['Float']>;
  mockup_type?: InputMaybe<Scalars['String']>;
  settings?: InputMaybe<Array<InputMaybe<InputSettingNameValue>>>;
  width?: InputMaybe<Scalars['Float']>;
};

export type InputProductMockupLayer = {
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  settings?: InputMaybe<Array<InputMaybe<InputSettingNameValue>>>;
  type?: InputMaybe<Scalars['String']>;
};

export type InputProductMockupPrintArea = {
  image?: InputMaybe<InputFile>;
  position?: InputMaybe<Scalars['String']>;
};

export type InputProductMockupSide = {
  document?: InputMaybe<InputMockupPrintDocument>;
  id?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<InputFile>;
  layers?: InputMaybe<Array<InputMaybe<InputProductMockupLayer>>>;
  mockup?: InputMaybe<InputFile>;
  name?: InputMaybe<Scalars['String']>;
  print_area?: InputMaybe<InputMockupPrintDimension>;
};

export type InputSettingNameValue = {
  name?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

export type InputSignedUploadFont = {
  filename?: InputMaybe<Scalars['String']>;
  mimetype?: InputMaybe<Scalars['String']>;
  size?: InputMaybe<Scalars['Int']>;
};

export type Invoice = {
  __typename?: 'Invoice';
  _id?: Maybe<Scalars['String']>;
  account_id?: Maybe<Scalars['String']>;
  amount?: Maybe<Scalars['Float']>;
  created_at?: Maybe<Scalars['Int']>;
  date?: Maybe<Scalars['String']>;
  identity?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type InvoiceByStatus = {
  __typename?: 'InvoiceByStatus';
  all?: Maybe<Scalars['Int']>;
  cancel?: Maybe<Scalars['Int']>;
  error?: Maybe<Scalars['Int']>;
  paid?: Maybe<Scalars['Int']>;
  pending?: Maybe<Scalars['Int']>;
};

export type Item = {
  __typename?: 'Item';
  _id?: Maybe<Scalars['String']>;
  attributes?: Maybe<Array<Maybe<Attribute>>>;
  description?: Maybe<Scalars['String']>;
  external_url?: Maybe<Scalars['String']>;
  images?: Maybe<Array<Maybe<Image>>>;
  imported_at?: Maybe<Scalars['Int']>;
  info?: Maybe<ItemInfo>;
  info_id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  package_height?: Maybe<Scalars['Float']>;
  package_length?: Maybe<Scalars['Float']>;
  package_width?: Maybe<Scalars['Float']>;
  paypal_email?: Maybe<Scalars['String']>;
  permalink?: Maybe<Scalars['String']>;
  platform?: Maybe<Scalars['String']>;
  platform_id?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['String']>;
  purchase_note?: Maybe<Scalars['String']>;
  sku?: Maybe<Scalars['String']>;
  sold?: Maybe<Scalars['String']>;
  store?: Maybe<Store>;
  store_id?: Maybe<Scalars['String']>;
  weight?: Maybe<Scalars['Float']>;
};

export type ItemInfo = {
  __typename?: 'ItemInfo';
  _id?: Maybe<Scalars['String']>;
  attribute_specifics?: Maybe<Array<Maybe<SpecificAttribute>>>;
  attribute_specifics_modify?: Maybe<Array<Maybe<SpecificAttribute>>>;
  back?: Maybe<Scalars['String']>;
  barcode?: Maybe<Scalars['String']>;
  barcode_type?: Maybe<Scalars['String']>;
  collections?: Maybe<Array<Maybe<Scalars['String']>>>;
  custom_name?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Scalars['String']>;
  description_ai?: Maybe<Scalars['String']>;
  description_ai_pos?: Maybe<Scalars['String']>;
  ebay_template_id?: Maybe<Scalars['String']>;
  extend_images?: Maybe<Array<Maybe<Image>>>;
  fix_profit?: Maybe<Scalars['Float']>;
  fixed_profit?: Maybe<Scalars['Float']>;
  front?: Maybe<Scalars['String']>;
  hood?: Maybe<Scalars['String']>;
  identity?: Maybe<Scalars['String']>;
  images?: Maybe<Array<Maybe<Image>>>;
  include_extend_images?: Maybe<Scalars['Boolean']>;
  include_size_chart?: Maybe<Scalars['Boolean']>;
  items?: Maybe<Array<Maybe<Item>>>;
  job_list?: Maybe<Scalars['String']>;
  mockup?: Maybe<MockupDesign>;
  mockup_id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  package_height?: Maybe<Scalars['Float']>;
  package_length?: Maybe<Scalars['Float']>;
  package_width?: Maybe<Scalars['Float']>;
  platform_category?: Maybe<Array<Maybe<PlatformCategory>>>;
  platform_specifics?: Maybe<Array<Maybe<PlatformItemSpecific>>>;
  plf_price?: Maybe<Scalars['Float']>;
  prety_attributes?: Maybe<Array<Maybe<PretyAttribute>>>;
  price?: Maybe<Scalars['Float']>;
  price_addition?: Maybe<Scalars['Float']>;
  product?: Maybe<ProductPreset>;
  product_id?: Maybe<Scalars['String']>;
  queue_messenger?: Maybe<Scalars['String']>;
  queue_status?: Maybe<Scalars['Boolean']>;
  shipping_preset?: Maybe<Scalars['String']>;
  shipping_preset_info?: Maybe<ShippingPreset>;
  size_chart?: Maybe<Scalars['String']>;
  sku?: Maybe<Scalars['String']>;
  sleeve?: Maybe<Scalars['String']>;
  specifics?: Maybe<Array<Maybe<ItemSpecific>>>;
  store?: Maybe<Store>;
  store_queue?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  tax_fee?: Maybe<Scalars['Float']>;
  tax_fee_fix?: Maybe<Scalars['Float']>;
  type?: Maybe<Scalars['String']>;
  weight?: Maybe<Scalars['Float']>;
};

export type ItemInfoUpdate = {
  _id?: InputMaybe<Scalars['String']>;
  description_ai?: InputMaybe<Scalars['String']>;
  description_ai_pos?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type ItemPreset = {
  __typename?: 'ItemPreset';
  _id?: Maybe<Scalars['String']>;
  attribute_specifics?: Maybe<Array<Maybe<SpecificAttribute>>>;
  attribute_specifics_modify?: Maybe<Array<Maybe<SpecificAttribute>>>;
  collections?: Maybe<Array<Maybe<Scalars['String']>>>;
  custom_name?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Scalars['String']>;
  ebay_template_id?: Maybe<Scalars['String']>;
  extend_images?: Maybe<Array<Maybe<Image>>>;
  fix_profit?: Maybe<Scalars['Float']>;
  fixed_profit?: Maybe<Scalars['Float']>;
  images?: Maybe<Array<Maybe<Image>>>;
  include_extend_images?: Maybe<Scalars['Boolean']>;
  include_size_chart?: Maybe<Scalars['Boolean']>;
  items?: Maybe<Array<Maybe<Item>>>;
  max_price?: Maybe<Scalars['String']>;
  min_price?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  platform_category?: Maybe<Array<Maybe<PlatformCategory>>>;
  platform_specifics?: Maybe<Array<Maybe<PlatformItemSpecific>>>;
  plf_price?: Maybe<Scalars['Float']>;
  prety_attributes?: Maybe<Array<Maybe<PretyAttribute>>>;
  price?: Maybe<Scalars['Float']>;
  price_addition?: Maybe<Scalars['Float']>;
  product?: Maybe<ProductPreset>;
  product_id?: Maybe<Scalars['String']>;
  shipping_preset?: Maybe<Scalars['String']>;
  size_chart?: Maybe<Scalars['String']>;
  specifics?: Maybe<Array<Maybe<ItemSpecific>>>;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  tax_fee?: Maybe<Scalars['Float']>;
  tax_fee_fix?: Maybe<Scalars['Float']>;
  type?: Maybe<Scalars['String']>;
};

export type ItemPretyAttributeInput = {
  attribute_type?: InputMaybe<Scalars['String']>;
  options?: InputMaybe<Array<InputMaybe<ItemPretyAttributeOptionInput>>>;
  plf_attribute_name?: InputMaybe<Scalars['String']>;
};

export type ItemPretyAttributeOptionInput = {
  default?: InputMaybe<Scalars['Boolean']>;
  ffm_value?: InputMaybe<Scalars['String']>;
  hex?: InputMaybe<Scalars['String']>;
  plf_price?: InputMaybe<Scalars['Float']>;
  plf_value?: InputMaybe<Scalars['String']>;
};

export type ItemSpecific = {
  __typename?: 'ItemSpecific';
  key?: Maybe<Scalars['String']>;
  required?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type ItemSpecificInput = {
  key?: InputMaybe<Scalars['String']>;
  required?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

export type Job = {
  __typename?: 'Job';
  pending?: Maybe<Scalars['Int']>;
  rejected?: Maybe<Scalars['Int']>;
  total?: Maybe<Scalars['Int']>;
  waiting?: Maybe<Scalars['Int']>;
};

export type JobRemoveInput = {
  _id?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['Int']>;
  store_id?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

export type Jobs = {
  __typename?: 'Jobs';
  _id?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['Int']>;
  fulfilment?: Maybe<Fulfilment>;
  job?: Maybe<Job>;
  job_type?: Maybe<Scalars['String']>;
  store?: Maybe<Store>;
};

export type JobsList = {
  __typename?: 'JobsList';
  _id?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['Int']>;
  data?: Maybe<Scalars['String']>;
  fulfilment?: Maybe<Fulfilment>;
  job_type?: Maybe<Scalars['String']>;
  msg?: Maybe<Array<Maybe<Msg>>>;
  order?: Maybe<Order>;
  pending?: Maybe<Scalars['String']>;
  store?: Maybe<Store>;
};

export type LabelDetails = {
  __typename?: 'LabelDetails';
  partnerTrackingNumber?: Maybe<Scalars['String']>;
  trackingNumber?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type Lenful = {
  __typename?: 'Lenful';
  email?: Maybe<Scalars['String']>;
  key?: Maybe<Scalars['String']>;
  lenful_store?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};

/** input for create or update */
export type LenfulInput = {
  email?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
  lenful_store?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
};

export type LineItem = {
  __typename?: 'LineItem';
  custom?: Maybe<Scalars['Boolean']>;
  external_folder?: Maybe<Scalars['String']>;
  final_value_fee?: Maybe<Scalars['String']>;
  folder?: Maybe<Scalars['String']>;
  item?: Maybe<Item>;
  meta_data?: Maybe<Array<Maybe<MetaData>>>;
  name?: Maybe<Scalars['String']>;
  order_line_item_id?: Maybe<Scalars['String']>;
  permalink?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['String']>;
  print?: Maybe<Print>;
  product_id?: Maybe<Scalars['String']>;
  quantity?: Maybe<Scalars['String']>;
  sku?: Maybe<Scalars['String']>;
  src?: Maybe<Scalars['String']>;
  sub_discount?: Maybe<Scalars['String']>;
  subtotal?: Maybe<Scalars['String']>;
  subtotal_tax?: Maybe<Scalars['String']>;
  total?: Maybe<Scalars['String']>;
  total_tax?: Maybe<Scalars['String']>;
  variation_id?: Maybe<Scalars['String']>;
};

export type ListCustom = {
  __typename?: 'ListCustom';
  _id?: Maybe<Scalars['String']>;
  collections?: Maybe<Array<Maybe<Scalars['String']>>>;
  image?: Maybe<Scalars['String']>;
  is_deleted?: Maybe<Scalars['Boolean']>;
  percentage_discount?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  title?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type ListCustomInput = {
  _id?: InputMaybe<Scalars['String']>;
  collections?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  image?: InputMaybe<Scalars['String']>;
  percentage_discount?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title?: InputMaybe<Scalars['String']>;
  url?: InputMaybe<Scalars['String']>;
};

export type Merchize = {
  __typename?: 'Merchize';
  key?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

/** input for create or update */
export type MerchizeInput = {
  key: Scalars['String'];
  url: Scalars['String'];
};

export type MerchizeStore = {
  __typename?: 'MerchizeStore';
  access_token?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

/** input for create or update */
export type MerchizeStoreInput = {
  access_token: Scalars['String'];
  url: Scalars['String'];
};

export type Messenger = {
  __typename?: 'Messenger';
  _id?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['String']>;
  expiration_at?: Maybe<Scalars['String']>;
  external_message_id?: Maybe<Scalars['String']>;
  platform?: Maybe<Scalars['String']>;
  platform_item_id?: Maybe<Scalars['String']>;
  platform_order_id?: Maybe<Scalars['String']>;
  readed?: Maybe<Scalars['Boolean']>;
  readers?: Maybe<Array<Maybe<User>>>;
  received_at?: Maybe<Scalars['String']>;
  /** Added by branch task-manager */
  reference?: Maybe<MessengerReference>;
  replied?: Maybe<Scalars['Boolean']>;
  replies?: Maybe<Array<Maybe<Reply>>>;
  sender?: Maybe<Scalars['String']>;
  star?: Maybe<Scalars['Boolean']>;
  status?: Maybe<Scalars['String']>;
  store?: Maybe<Store>;
  store_id?: Maybe<Scalars['String']>;
  subject?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
  thread?: Maybe<Array<Maybe<Thread>>>;
  type?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
  /** ref_id: String */
  user_id?: Maybe<Scalars['String']>;
};

export type MessengerCount = {
  __typename?: 'MessengerCount';
  count?: Maybe<Scalars['Int']>;
  filter?: Maybe<Scalars['String']>;
  status?: Maybe<Array<Maybe<MessengerCountStatus>>>;
};

export type MessengerCountStatus = {
  __typename?: 'MessengerCountStatus';
  count?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['String']>;
};

export type MessengerReference = {
  __typename?: 'MessengerReference';
  namespace?: Maybe<Scalars['String']>;
  oid?: Maybe<Scalars['String']>;
};

export type MetaData = {
  __typename?: 'MetaData';
  id?: Maybe<Scalars['String']>;
  key?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type MetaDataInput = {
  key?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

export enum Method {
  Add = 'ADD',
  Delete = 'DELETE',
  Root = 'ROOT',
  Update = 'UPDATE',
  View = 'VIEW'
}

export type MockupCounter = {
  __typename?: 'MockupCounter';
  all?: Maybe<Scalars['Int']>;
  draft?: Maybe<Scalars['Int']>;
  published?: Maybe<Scalars['Int']>;
  trashed?: Maybe<Scalars['Int']>;
};

export type MockupDesign = {
  __typename?: 'MockupDesign';
  _id?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['String']>;
  created_by?: Maybe<Scalars['String']>;
  height?: Maybe<Scalars['Float']>;
  image?: Maybe<Scalars['String']>;
  images?: Maybe<Array<Maybe<MockupImage>>>;
  name?: Maybe<Scalars['String']>;
  prints?: Maybe<Array<Maybe<MockupPrint>>>;
  status?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<MockupDesignTag>>>;
  updated_at?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
  width?: Maybe<Scalars['Float']>;
};

export type MockupDesignCategory = {
  __typename?: 'MockupDesignCategory';
  _id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type MockupDesignTag = {
  __typename?: 'MockupDesignTag';
  _id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type MockupFile = {
  __typename?: 'MockupFile';
  filename?: Maybe<Scalars['String']>;
  height?: Maybe<Scalars['Float']>;
  image_sizes?: Maybe<Array<Maybe<MockupFileSize>>>;
  mimetype?: Maybe<Scalars['String']>;
  path?: Maybe<Scalars['String']>;
  size?: Maybe<Scalars['Float']>;
  url?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Float']>;
};

export type MockupFileInput = {
  filename?: InputMaybe<Scalars['String']>;
  height?: InputMaybe<Scalars['Float']>;
  image_sizes?: InputMaybe<Array<InputMaybe<MockupFileSizeInput>>>;
  mimetype?: InputMaybe<Scalars['String']>;
  path?: InputMaybe<Scalars['String']>;
  size?: InputMaybe<Scalars['Float']>;
  url?: InputMaybe<Scalars['String']>;
  width?: InputMaybe<Scalars['Float']>;
};

export type MockupFileSize = {
  __typename?: 'MockupFileSize';
  height?: Maybe<Scalars['Float']>;
  mimetype?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Float']>;
};

export type MockupFileSizeInput = {
  height?: InputMaybe<Scalars['Float']>;
  mimetype?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  url?: InputMaybe<Scalars['String']>;
  width?: InputMaybe<Scalars['Float']>;
};

export type MockupImage = {
  __typename?: 'MockupImage';
  image?: Maybe<MockupFile>;
  name?: Maybe<Scalars['String']>;
  print_fit?: Maybe<Scalars['Boolean']>;
  print_height?: Maybe<Scalars['Float']>;
  print_knew_x?: Maybe<Scalars['Float']>;
  print_knew_y?: Maybe<Scalars['Float']>;
  print_rotate?: Maybe<Scalars['Float']>;
  print_width?: Maybe<Scalars['Float']>;
  print_x?: Maybe<Scalars['Float']>;
  print_y?: Maybe<Scalars['Float']>;
  settings?: Maybe<ImagePrintSetting>;
  type?: Maybe<Scalars['String']>;
};

export type MockupImageInput = {
  image?: InputMaybe<MockupFileInput>;
  name?: InputMaybe<Scalars['String']>;
  print_fit?: InputMaybe<Scalars['Boolean']>;
  print_height?: InputMaybe<Scalars['Float']>;
  print_knew_x?: InputMaybe<Scalars['Float']>;
  print_knew_y?: InputMaybe<Scalars['Float']>;
  print_rotate?: InputMaybe<Scalars['Float']>;
  print_width?: InputMaybe<Scalars['Float']>;
  print_x?: InputMaybe<Scalars['Float']>;
  print_y?: InputMaybe<Scalars['Float']>;
  settings?: InputMaybe<ImagePrintSettingIput>;
  type?: InputMaybe<Scalars['String']>;
};

export type MockupPrint = {
  __typename?: 'MockupPrint';
  name?: Maybe<Scalars['String']>;
  prints?: Maybe<Array<Maybe<PrintLine>>>;
};

export type MockupPrintDimension = {
  __typename?: 'MockupPrintDimension';
  height?: Maybe<Scalars['Float']>;
  knewX?: Maybe<Scalars['Float']>;
  knewY?: Maybe<Scalars['Float']>;
  rotation?: Maybe<Scalars['Float']>;
  scaleX?: Maybe<Scalars['Float']>;
  scaleY?: Maybe<Scalars['Float']>;
  width?: Maybe<Scalars['Float']>;
  x?: Maybe<Scalars['Float']>;
  y?: Maybe<Scalars['Float']>;
};

/** mockup template */
export type MockupPrintDocument = {
  __typename?: 'MockupPrintDocument';
  height?: Maybe<Scalars['Float']>;
  settings?: Maybe<Array<Maybe<SettingNameValue>>>;
  width?: Maybe<Scalars['Float']>;
};

export type MockupPrintInput = {
  name?: InputMaybe<Scalars['String']>;
  print_height?: InputMaybe<Scalars['Float']>;
  print_knew_x?: InputMaybe<Scalars['Float']>;
  print_knew_y?: InputMaybe<Scalars['Float']>;
  print_rotate?: InputMaybe<Scalars['Float']>;
  print_width?: InputMaybe<Scalars['Float']>;
  print_x?: InputMaybe<Scalars['Float']>;
  print_y?: InputMaybe<Scalars['Float']>;
  prints?: InputMaybe<Array<InputMaybe<MockupPrintLineInput>>>;
};

export type MockupPrintLineInput = {
  image?: InputMaybe<MockupFileInput>;
  type?: InputMaybe<Scalars['String']>;
};

export type Msg = {
  __typename?: 'Msg';
  code?: Maybe<Scalars['String']>;
  msg?: Maybe<Scalars['String']>;
};

export type MulstranLastUpdate = {
  __typename?: 'MulstranLastUpdate';
  date?: Maybe<Scalars['String']>;
  timezone?: Maybe<Scalars['String']>;
  timezone_type?: Maybe<Scalars['Int']>;
};

export type NameValueType = {
  __typename?: 'NameValueType';
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type NameValueTypeInput = {
  name?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

export type NetworkAccount = {
  __typename?: 'NetworkAccount';
  _id: Scalars['String'];
  created_at: Scalars['Date'];
  deleted_at?: Maybe<Scalars['Date']>;
  expires_in?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['String']>;
  nicename?: Maybe<Scalars['String']>;
  refresh_token?: Maybe<Scalars['String']>;
  scope?: Maybe<Scalars['String']>;
  token_type?: Maybe<Scalars['String']>;
  type: Scalars['String'];
  updated_at: Scalars['Date'];
  username?: Maybe<Scalars['String']>;
};

export type NetworkCollection = {
  __typename?: 'NetworkCollection';
  _id: Scalars['String'];
  accounts?: Maybe<Array<NetworkAccount>>;
  created_at: Scalars['Date'];
  deleted_at?: Maybe<Scalars['Date']>;
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  updated_at: Scalars['Date'];
};

export type Notification = {
  __typename?: 'Notification';
  _id?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['Int']>;
  image?: Maybe<Scalars['String']>;
  referent?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  subject?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type NotificationCount = {
  __typename?: 'NotificationCount';
  count?: Maybe<Scalars['Int']>;
};

export type Onos = {
  __typename?: 'Onos';
  key?: Maybe<Scalars['String']>;
};

/** input for create or update */
export type OnosInput = {
  key: Scalars['String'];
};

export type Order = {
  __typename?: 'Order';
  _id?: Maybe<Scalars['String']>;
  alias_id?: Maybe<Scalars['String']>;
  base?: Maybe<Scalars['String']>;
  base_modified?: Maybe<Scalars['Boolean']>;
  base_ship_total?: Maybe<Scalars['String']>;
  base_total?: Maybe<Scalars['String']>;
  billing?: Maybe<Address>;
  buyer_id?: Maybe<Scalars['String']>;
  completed_at?: Maybe<Scalars['Int']>;
  created_at?: Maybe<Scalars['Int']>;
  currency?: Maybe<Scalars['String']>;
  custom_id?: Maybe<Scalars['String']>;
  /** prices_include_tax: String */
  customer_note?: Maybe<Scalars['String']>;
  defer_tracking?: Maybe<Scalars['String']>;
  discount_total?: Maybe<Scalars['String']>;
  email_alias?: Maybe<Scalars['String']>;
  estimated_delivery?: Maybe<Scalars['Int']>;
  external_transaction_id?: Maybe<Scalars['String']>;
  fee_modified?: Maybe<Scalars['Boolean']>;
  fulfilment_auto_at?: Maybe<Scalars['Int']>;
  fulfilment_state?: Maybe<Scalars['String']>;
  identity?: Maybe<Scalars['String']>;
  imported_at?: Maybe<Scalars['Int']>;
  inproduction_at?: Maybe<Scalars['Int']>;
  line_items?: Maybe<Array<Maybe<LineItem>>>;
  msg?: Maybe<Array<Maybe<Msg>>>;
  order_tickets?: Maybe<Array<Maybe<Scalars['String']>>>;
  paid_at?: Maybe<Scalars['Int']>;
  parent?: Maybe<Scalars['String']>;
  payment_method?: Maybe<Scalars['String']>;
  payment_method_title?: Maybe<Scalars['String']>;
  platform?: Maybe<Scalars['String']>;
  platform_id?: Maybe<Scalars['String']>;
  private_note?: Maybe<Scalars['String']>;
  shipping?: Maybe<Address>;
  shipping_lines?: Maybe<Array<Maybe<ShippingLine>>>;
  /** discount_tax: String */
  shipping_total?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  sto_auto_fulfilment_delay?: Maybe<Scalars['Int']>;
  store?: Maybe<Store>;
  store_id?: Maybe<Scalars['String']>;
  /**
   * shipping_tax: String
   * cart_tax: String
   */
  total?: Maybe<Scalars['String']>;
  total_fee?: Maybe<Scalars['String']>;
  total_fee_ad?: Maybe<Scalars['String']>;
  total_fee_ex?: Maybe<Scalars['String']>;
  total_refund?: Maybe<Scalars['String']>;
  total_tax?: Maybe<Scalars['String']>;
  tracking?: Maybe<TrackingType>;
  transactions?: Maybe<Array<Maybe<Transaction>>>;
  updated_at?: Maybe<Scalars['Int']>;
};

export type OrderItemInput = {
  custom?: InputMaybe<Scalars['Boolean']>;
  item_index?: InputMaybe<Scalars['Int']>;
  item_internal_id?: InputMaybe<Scalars['String']>;
  meta_data?: InputMaybe<Array<InputMaybe<MetaDataInput>>>;
  name?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['String']>;
  print?: InputMaybe<PrintInputOnly>;
  quantity?: InputMaybe<Scalars['String']>;
  src?: InputMaybe<Scalars['Upload']>;
  url?: InputMaybe<Scalars['String']>;
};

export enum OrderStatus {
  Cancelled = 'Cancelled',
  Completed = 'Completed',
  Fulfilled = 'Fulfilled',
  In = 'In',
  Pending = 'Pending',
  Processing = 'Processing',
  Production = 'Production',
  Refunded = 'Refunded',
  Trash = 'Trash'
}

export type OrderTotal = {
  __typename?: 'OrderTotal';
  total?: Maybe<Scalars['Int']>;
};

export type Paypal = {
  __typename?: 'Paypal';
  _id?: Maybe<Scalars['String']>;
  auto_sync?: Maybe<Scalars['String']>;
  balance?: Maybe<Scalars['Float']>;
  bank_status?: Maybe<Scalars['String']>;
  client?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['Int']>;
  currency?: Maybe<Scalars['String']>;
  date_180?: Maybe<Scalars['Int']>;
  doc_status?: Maybe<Scalars['String']>;
  emails?: Maybe<Array<Maybe<Scalars['String']>>>;
  errors?: Maybe<Array<Maybe<Scalars['String']>>>;
  external_store?: Maybe<Scalars['String']>;
  hold?: Maybe<Scalars['Float']>;
  name?: Maybe<Scalars['String']>;
  private_note?: Maybe<Scalars['String']>;
  secret?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  store?: Maybe<Store>;
  store_id?: Maybe<Scalars['String']>;
  transactions?: Maybe<Array<Maybe<PaypalTransaction>>>;
  updated_at?: Maybe<Scalars['Int']>;
  updated_at_balance?: Maybe<Scalars['Int']>;
  username?: Maybe<Scalars['String']>;
  verify_status?: Maybe<Scalars['String']>;
};

export type PaypalTransaction = {
  __typename?: 'PaypalTransaction';
  date?: Maybe<Scalars['Int']>;
  money?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type Permission = {
  __typename?: 'Permission';
  access?: Maybe<AccessView>;
  module?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type PermissionInput = {
  access?: InputMaybe<AccessViewInput>;
  module?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type PlatFormOrderTotal = {
  __typename?: 'PlatFormOrderTotal';
  bigcommerce?: Maybe<Scalars['Int']>;
  ebay?: Maybe<Scalars['Int']>;
  etsy?: Maybe<Scalars['Int']>;
  shopify?: Maybe<Scalars['Int']>;
  wish?: Maybe<Scalars['Int']>;
  woocommerce?: Maybe<Scalars['Int']>;
};

export type PlatformCategory = {
  __typename?: 'PlatformCategory';
  category_selected?: Maybe<Array<Maybe<PlatformCategorySelected>>>;
  type?: Maybe<Scalars['String']>;
};

export type PlatformCategoryInput = {
  category_selected?: InputMaybe<Array<InputMaybe<PlatformCategorySelectedInput>>>;
  type?: InputMaybe<Scalars['String']>;
};

export type PlatformCategorySelected = {
  __typename?: 'PlatformCategorySelected';
  id?: Maybe<Scalars['String']>;
  level?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  parent?: Maybe<Scalars['String']>;
};

export type PlatformCategorySelectedInput = {
  id?: InputMaybe<Scalars['String']>;
  level?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  parent?: InputMaybe<Scalars['String']>;
};

export type PlatformItemSpecific = {
  __typename?: 'PlatformItemSpecific';
  platform?: Maybe<Scalars['String']>;
  specifics?: Maybe<Array<Maybe<ItemSpecific>>>;
};

export type PlatformItemSpecificInput = {
  platform: Scalars['String'];
  specifics?: InputMaybe<Array<InputMaybe<ItemSpecificInput>>>;
};

export type PlatformProductCategory = {
  __typename?: 'PlatformProductCategory';
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  level?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  parent?: Maybe<Scalars['String']>;
};

export type PlatformProductCategorySearch = {
  __typename?: 'PlatformProductCategorySearch';
  categories?: Maybe<Array<Maybe<PlatformProductCategory>>>;
  label?: Maybe<Scalars['String']>;
};

export type PlatformProductSpecifics = {
  __typename?: 'PlatformProductSpecifics';
  default_value?: Maybe<Scalars['String']>;
  disabled?: Maybe<Scalars['Boolean']>;
  helper?: Maybe<Scalars['String']>;
  key?: Maybe<Scalars['String']>;
  mode?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  placeholder?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  value?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type PretyAttribute = {
  __typename?: 'PretyAttribute';
  attribute_type?: Maybe<Scalars['String']>;
  options?: Maybe<Array<Maybe<PretyAttributeOption>>>;
  plf_attribute_name?: Maybe<Scalars['String']>;
};

export type PretyAttributeOption = {
  __typename?: 'PretyAttributeOption';
  default?: Maybe<Scalars['Boolean']>;
  ffm_value?: Maybe<Scalars['String']>;
  hex?: Maybe<Scalars['String']>;
  plf_price?: Maybe<Scalars['Float']>;
  plf_value?: Maybe<Scalars['String']>;
};

export type Print = {
  __typename?: 'Print';
  back?: Maybe<Scalars['String']>;
  design_from_item?: Maybe<Scalars['Boolean']>;
  front?: Maybe<Scalars['String']>;
  hood?: Maybe<Scalars['String']>;
  meta_data?: Maybe<Array<Maybe<MetaData>>>;
  sleeve?: Maybe<Scalars['String']>;
};

export type PrintAreas = {
  __typename?: 'PrintAreas';
  position?: Maybe<Scalars['String']>;
  print?: Maybe<Scalars['String']>;
};

export type PrintAttributeInput = {
  item_id?: InputMaybe<Scalars['String']>;
  item_index?: InputMaybe<Scalars['String']>;
  meta_data?: InputMaybe<Array<InputMaybe<MetaDataInput>>>;
  variation?: InputMaybe<Scalars['String']>;
};

export type PrintFileItem = {
  __typename?: 'PrintFileItem';
  image?: Maybe<FileImage>;
  /** print file position */
  type?: Maybe<Scalars['String']>;
};

export type PrintInput = {
  back?: InputMaybe<Scalars['Upload']>;
  front?: InputMaybe<Scalars['Upload']>;
  hood?: InputMaybe<Scalars['Upload']>;
  item_id: Scalars['String'];
  sleeve?: InputMaybe<Scalars['Upload']>;
};

export type PrintInputOnly = {
  back?: InputMaybe<Scalars['Upload']>;
  front?: InputMaybe<Scalars['Upload']>;
  hood?: InputMaybe<Scalars['Upload']>;
  meta_data?: InputMaybe<Array<InputMaybe<MetaDataInput>>>;
  sleeve?: InputMaybe<Scalars['Upload']>;
};

export type PrintLine = {
  __typename?: 'PrintLine';
  image?: Maybe<MockupFile>;
  type?: Maybe<Scalars['String']>;
};

export type PrintRemoveInput = {
  back?: InputMaybe<Scalars['Boolean']>;
  front?: InputMaybe<Scalars['Boolean']>;
  hood?: InputMaybe<Scalars['Boolean']>;
  item_id: Scalars['String'];
  sleeve?: InputMaybe<Scalars['Boolean']>;
};

export type Printify = {
  __typename?: 'Printify';
  key?: Maybe<Scalars['String']>;
  store?: Maybe<Scalars['String']>;
};

/** input for create or update */
export type PrintifyInput = {
  key: Scalars['String'];
  store?: InputMaybe<Scalars['String']>;
};

export type Printway = {
  __typename?: 'Printway';
  email?: Maybe<Scalars['String']>;
  key?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};

/** input for create or update */
export type PrintwayInput = {
  email?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
};

export type Private = {
  __typename?: 'Private';
  key?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type PrivateFulfilment = {
  __typename?: 'PrivateFulfilment';
  _id?: Maybe<Scalars['String']>;
  base?: Maybe<Scalars['String']>;
  billing?: Maybe<Address>;
  buyer_id?: Maybe<Scalars['String']>;
  completed_at?: Maybe<Scalars['Int']>;
  created_at?: Maybe<Scalars['Int']>;
  currency?: Maybe<Scalars['String']>;
  custom_id?: Maybe<Scalars['String']>;
  /** prices_include_tax: String */
  customer_note?: Maybe<Scalars['String']>;
  defer_tracking?: Maybe<Scalars['String']>;
  discount_total?: Maybe<Scalars['String']>;
  email_alias?: Maybe<Scalars['String']>;
  estimated_delivery?: Maybe<Scalars['Int']>;
  imported_at?: Maybe<Scalars['Int']>;
  line_items?: Maybe<Array<Maybe<LineItem>>>;
  paid_at?: Maybe<Scalars['Int']>;
  parent?: Maybe<Scalars['String']>;
  payment_method?: Maybe<Scalars['String']>;
  payment_method_title?: Maybe<Scalars['String']>;
  platform?: Maybe<Scalars['String']>;
  platform_id?: Maybe<Scalars['String']>;
  private_note?: Maybe<Scalars['String']>;
  shipping?: Maybe<Address>;
  shipping_lines?: Maybe<Array<Maybe<ShippingLine>>>;
  /** discount_tax: String */
  shipping_total?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  store?: Maybe<Store>;
  store_id?: Maybe<Scalars['String']>;
  /**
   * shipping_tax: String
   * cart_tax: String
   */
  total?: Maybe<Scalars['String']>;
  total_fee?: Maybe<Scalars['String']>;
  total_tax?: Maybe<Scalars['String']>;
  tracking?: Maybe<TrackingType>;
  updated_at?: Maybe<Scalars['Int']>;
};

/** input for create or update */
export type PrivateInput = {
  key: Scalars['String'];
  url: Scalars['String'];
};

export type ProductMockup = {
  __typename?: 'ProductMockup';
  _id: Scalars['String'];
  created_at?: Maybe<Scalars['Date']>;
  id?: Maybe<Scalars['String']>;
  item_info_id?: Maybe<Scalars['String']>;
  mockup_info?: Maybe<Array<Maybe<ProductMockupInfo>>>;
  mockup_type: Scalars['String'];
  preset?: Maybe<ProductMockupPreset>;
  preset_id?: Maybe<Scalars['String']>;
  print_areas?: Maybe<Array<Maybe<ProductMockupPrintArea>>>;
  product?: Maybe<ProductPreset>;
  product_id?: Maybe<Scalars['String']>;
  provider_product_id?: Maybe<Scalars['String']>;
  sides?: Maybe<Array<Maybe<ProductMockupSide>>>;
  src?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['Date']>;
  user_id?: Maybe<Scalars['String']>;
};

export type ProductMockupInfo = {
  __typename?: 'ProductMockupInfo';
  color?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type ProductMockupLayer = {
  __typename?: 'ProductMockupLayer';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  settings?: Maybe<Array<Maybe<SettingNameValue>>>;
  type?: Maybe<Scalars['String']>;
};

export type ProductMockupPreset = {
  __typename?: 'ProductMockupPreset';
  _id?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['Date']>;
  id?: Maybe<Scalars['String']>;
  mockup_type?: Maybe<Scalars['String']>;
  model?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  print_areas?: Maybe<Array<Maybe<ProductMockupPrintArea>>>;
  product?: Maybe<ProductPreset>;
  product_id?: Maybe<Scalars['String']>;
  provider?: Maybe<Scalars['String']>;
  sides?: Maybe<Array<Maybe<ProductMockupSide>>>;
  sku?: Maybe<Scalars['String']>;
  src?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['Date']>;
};

export type ProductMockupPrintArea = {
  __typename?: 'ProductMockupPrintArea';
  image?: Maybe<File>;
  position?: Maybe<Scalars['String']>;
};

export type ProductMockupSide = {
  __typename?: 'ProductMockupSide';
  document?: Maybe<MockupPrintDocument>;
  id?: Maybe<Scalars['String']>;
  image?: Maybe<File>;
  layers?: Maybe<Array<Maybe<ProductMockupLayer>>>;
  mockup?: Maybe<File>;
  name?: Maybe<Scalars['String']>;
  print_area?: Maybe<MockupPrintDimension>;
};

export type ProductPreset = {
  __typename?: 'ProductPreset';
  _id?: Maybe<Scalars['String']>;
  attribute_specifics?: Maybe<Array<Maybe<SpecificAttribute>>>;
  category?: Maybe<Scalars['String']>;
  collections?: Maybe<Array<Maybe<Scalars['String']>>>;
  description?: Maybe<Scalars['String']>;
  extend_images?: Maybe<Array<Maybe<Image>>>;
  favorite?: Maybe<Scalars['Boolean']>;
  fix_profit?: Maybe<Scalars['Float']>;
  fixed_profit?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  international_shipping_additional_cost?: Maybe<Scalars['Float']>;
  international_shipping_cost?: Maybe<Scalars['Float']>;
  max_price?: Maybe<Scalars['String']>;
  min_price?: Maybe<Scalars['String']>;
  mockup_count?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  package_height?: Maybe<Scalars['Float']>;
  package_length?: Maybe<Scalars['Float']>;
  package_width?: Maybe<Scalars['Float']>;
  platform_category?: Maybe<Array<Maybe<PlatformCategory>>>;
  platform_specifics?: Maybe<Array<Maybe<PlatformItemSpecific>>>;
  prety_attributes?: Maybe<Array<Maybe<PretyAttribute>>>;
  price?: Maybe<Scalars['Float']>;
  price_addition?: Maybe<Scalars['Float']>;
  print_area_id?: Maybe<Scalars['String']>;
  print_areas?: Maybe<Array<Maybe<PrintAreas>>>;
  print_template?: Maybe<Scalars['String']>;
  provider?: Maybe<Scalars['String']>;
  provider_id?: Maybe<Scalars['String']>;
  raw_name?: Maybe<Scalars['String']>;
  shipping_additional_cost?: Maybe<Scalars['Float']>;
  shipping_cost?: Maybe<Scalars['Float']>;
  shipping_preset?: Maybe<Scalars['String']>;
  size_chart?: Maybe<Scalars['String']>;
  specifics?: Maybe<Array<Maybe<ItemSpecific>>>;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  tax_fee?: Maybe<Scalars['Float']>;
  tax_fee_fix?: Maybe<Scalars['Float']>;
  type?: Maybe<Scalars['String']>;
  weight?: Maybe<Scalars['Float']>;
};

export type ProductPresetMockupProviderCount = {
  __typename?: 'ProductPresetMockupProviderCount';
  customcat?: Maybe<Scalars['Int']>;
  geargag?: Maybe<Scalars['Int']>;
  lionnix?: Maybe<Scalars['Int']>;
  merchize?: Maybe<Scalars['Int']>;
  printify?: Maybe<Scalars['Int']>;
  private?: Maybe<Scalars['Int']>;
  scalable?: Maybe<Scalars['Int']>;
  total?: Maybe<Scalars['Int']>;
};

export type ProviderProductType = {
  __typename?: 'ProviderProductType';
  _id?: Maybe<Scalars['String']>;
  attribute_specifics?: Maybe<Array<Maybe<SpecificAttribute>>>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  max_price?: Maybe<Scalars['String']>;
  min_price?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  /** for mockup */
  prety_attributes?: Maybe<Array<Maybe<PretyAttribute>>>;
};

export type ProviderProductTypePrintArea = {
  __typename?: 'ProviderProductTypePrintArea';
  id?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type ProviderProductTypeProvider = {
  __typename?: 'ProviderProductTypeProvider';
  id?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type RandomId = {
  __typename?: 'RandomID';
  key?: Maybe<Scalars['String']>;
};

export type RemindTimeInput = {
  hour?: InputMaybe<Scalars['Int']>;
  minute?: InputMaybe<Scalars['Int']>;
};

export type Reply = {
  __typename?: 'Reply';
  at?: Maybe<Scalars['Int']>;
  content?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  user?: Maybe<Scalars['String']>;
};

export type ResponseCheckUserAccess = {
  __typename?: 'ResponseCheckUserAccess';
  allowed?: Maybe<Scalars['Boolean']>;
};

export type ResultAppConfig = {
  __typename?: 'ResultAppConfig';
  _id?: Maybe<Scalars['String']>;
  actions?: Maybe<Array<Maybe<AppConfigAction>>>;
  by?: Maybe<Scalars['String']>;
  group?: Maybe<TelegramGroup>;
  keys?: Maybe<Array<Maybe<AppConfigKey>>>;
  status?: Maybe<Scalars['Boolean']>;
  type?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type ResultSendEmail = {
  __typename?: 'ResultSendEmail';
  message?: Maybe<Scalars['String']>;
  result?: Maybe<Scalars['Boolean']>;
};

export type ResultSetAppConfig = {
  __typename?: 'ResultSetAppConfig';
  message?: Maybe<Scalars['String']>;
  result?: Maybe<Scalars['Boolean']>;
};

export type ResultStoreSendMail = {
  __typename?: 'ResultStoreSendMail';
  SMTPHost?: Maybe<Scalars['String']>;
  SMTPPassword?: Maybe<Scalars['String']>;
  SMTPPort?: Maybe<Scalars['String']>;
  SMTPSender?: Maybe<Scalars['String']>;
  SMTPStatus?: Maybe<Scalars['Boolean']>;
  SMTPUser?: Maybe<Scalars['String']>;
  _id?: Maybe<Scalars['String']>;
};

export type ResultTopup = {
  __typename?: 'ResultTopup';
  message?: Maybe<Scalars['String']>;
  result?: Maybe<Scalars['Boolean']>;
  transaction_id?: Maybe<Scalars['String']>;
};

export type RootMutation = {
  __typename?: 'RootMutation';
  applyDesign?: Maybe<Task>;
  applyTaskDesignOrder?: Maybe<Order>;
  bulkItemInfo?: Maybe<Array<Maybe<ItemInfo>>>;
  clipartUpdatePreSignedFile?: Maybe<Clipart>;
  cloneCart?: Maybe<Array<Maybe<Cart>>>;
  cloneOrder?: Maybe<Array<Maybe<Order>>>;
  convertItemImages?: Maybe<ItemInfo>;
  createCart?: Maybe<Array<Maybe<Cart>>>;
  /** Ebay Template */
  createEbayTemplate?: Maybe<EbayTemplate>;
  /** Added by branch task-manager */
  createMessage?: Maybe<Messenger>;
  createMockupDesign?: Maybe<MockupDesign>;
  createOrder?: Maybe<Array<Maybe<Order>>>;
  /** Tasks */
  createTask?: Maybe<Task>;
  createUser?: Maybe<User>;
  deleteById?: Maybe<User>;
  deleteEbayTemplate?: Maybe<EbayTemplate>;
  deleteNetworkCollection?: Maybe<NetworkCollection>;
  deletePaypal?: Maybe<Array<Maybe<Paypal>>>;
  deleteTask?: Maybe<Task>;
  /** Submit design request only */
  designRequest?: Maybe<Task>;
  designRequestMessage?: Maybe<Messenger>;
  /**
   *  End Added by branch task-manager
   * Docker maker
   */
  dockerMake?: Maybe<Docker>;
  dockerTrash?: Maybe<Array<Maybe<Docker>>>;
  eraseImage?: Maybe<EraseImage>;
  fontUpdatePreSignedFile?: Maybe<Font>;
  fulfilmentOrder?: Maybe<Array<Maybe<Order>>>;
  generateImageMask?: Maybe<File>;
  hubSyncPaypal?: Maybe<Paypal>;
  jobItem?: Maybe<Job>;
  jobsRemove?: Maybe<Msg>;
  jobsStart?: Maybe<Array<Maybe<Jobs>>>;
  jobsStop?: Maybe<Array<Maybe<Jobs>>>;
  login?: Maybe<Scalars['String']>;
  makeBigcommerceConfiguration?: Maybe<BigCommerceConfiguration>;
  makeBlog?: Maybe<Blog>;
  /** Cart maker */
  makeCart?: Maybe<Array<Maybe<Cart>>>;
  makeConfiguration?: Maybe<Configuration>;
  /** Customer maker */
  makeCustomer?: Maybe<Array<Maybe<Customer>>>;
  makeCustomers?: Maybe<Array<Maybe<Customer>>>;
  makeEmailContent?: Maybe<Array<Maybe<Email>>>;
  makeEtsyConfiguration?: Maybe<EtsyConfiguration>;
  makeEtsyKey?: Maybe<Array<Maybe<EtsyKey>>>;
  makeEtsyKeys?: Maybe<Array<Maybe<EtsyKey>>>;
  /** Fulfilment maker */
  makeFulfilment?: Maybe<Array<Maybe<Fulfilment>>>;
  makeItemInfo?: Maybe<Array<Maybe<Item>>>;
  makeItemPreset?: Maybe<Array<Maybe<ItemPreset>>>;
  /** ListingCustom maker */
  makeListCustom?: Maybe<Array<Maybe<ListCustom>>>;
  /** ListingsCustom maker */
  makeListCustoms?: Maybe<Array<Maybe<ListCustom>>>;
  makeMessenger?: Maybe<Messenger>;
  makeMockupPreview?: Maybe<File>;
  /** Order maker */
  makeOrder?: Maybe<Array<Maybe<Order>>>;
  makePaypal?: Maybe<Array<Maybe<Paypal>>>;
  makePrivate?: Maybe<Array<Maybe<PrivateFulfilment>>>;
  makeProductMockup?: Maybe<ProductMockup>;
  makeProductMockupPreset?: Maybe<ProductMockupPreset>;
  /** Until */
  makeRandomID?: Maybe<RandomId>;
  /** Mulstran */
  makeShippingLabel?: Maybe<Order>;
  makeShippingPreset?: Maybe<Array<Maybe<ShippingPreset>>>;
  /** Store maker */
  makeStore?: Maybe<Array<Maybe<Store>>>;
  makeTransaction?: Maybe<Transaction>;
  makeUser?: Maybe<Array<Maybe<User>>>;
  makeUserGroup?: Maybe<Array<Maybe<UserGroup>>>;
  makeUserGroups?: Maybe<Array<Maybe<UserGroup>>>;
  networkAuthorize?: Maybe<NetworkAccount>;
  notificationMake?: Maybe<Array<Maybe<Notification>>>;
  notificationReadAll?: Maybe<Array<Maybe<Notification>>>;
  productPresetCreate?: Maybe<ProductPreset>;
  productPresetCreateByJson?: Maybe<ProductPreset>;
  productPresetPaste?: Maybe<ProductPreset>;
  productPresetRemove?: Maybe<ProductPreset>;
  productPresetUpdate?: Maybe<ProductPreset>;
  putItemToStore?: Maybe<ItemInfo>;
  queueItem?: Maybe<Array<Maybe<Item>>>;
  queueRemoveItem?: Maybe<Array<Maybe<ItemInfo>>>;
  removeClipart?: Maybe<Clipart>;
  removeFile?: Maybe<File>;
  removeItemInfo?: Maybe<Array<Maybe<Item>>>;
  removeItemPreset?: Maybe<ItemPreset>;
  removeProductMockupPreset?: Maybe<ProductMockupPreset>;
  replyMessenger?: Maybe<Messenger>;
  /** Design */
  saveDesign?: Maybe<Design>;
  saveEbayTemplate?: Maybe<EbayTemplate>;
  saveFile?: Maybe<File>;
  saveNetworkCollection?: Maybe<NetworkCollection>;
  /** Send EMails */
  sendEmails?: Maybe<ResultSendEmail>;
  sendMessenger?: Maybe<Messenger>;
  /** Set app config */
  setAppConfig?: Maybe<ResultSetAppConfig>;
  settingEmailContent?: Maybe<EmailSetting>;
  signedUpload?: Maybe<FileSigned>;
  signedUploadClipart?: Maybe<ClipartFileSigned>;
  signedUploadFont?: Maybe<Array<Maybe<FontFileSigned>>>;
  splitCart?: Maybe<Array<Maybe<Cart>>>;
  splitOrder?: Maybe<Array<Maybe<Order>>>;
  storageMake?: Maybe<Storage>;
  /** submit ticket */
  submitDesignTicket?: Maybe<DesignTicket>;
  syncCart?: Maybe<Array<Maybe<Cart>>>;
  syncOrder?: Maybe<Array<Maybe<Order>>>;
  syncOrderPrint?: Maybe<Array<Maybe<Order>>>;
  syncPaypal?: Maybe<Paypal>;
  testBigcommerceKey?: Maybe<BigCommerceConfiguration>;
  testEtsyKey?: Maybe<EtsyConfiguration>;
  topupAccount?: Maybe<Transaction>;
  trashCart?: Maybe<Array<Maybe<Cart>>>;
  trashCustomer?: Maybe<Array<Maybe<Customer>>>;
  trashEbayTemplate?: Maybe<EbayTemplate>;
  trashFulfilment?: Maybe<Array<Maybe<Fulfilment>>>;
  trashMockupDesign?: Maybe<Array<Maybe<MockupDesign>>>;
  trashOrder?: Maybe<Array<Maybe<Order>>>;
  trashPrivate?: Maybe<Array<Maybe<PrivateFulfilment>>>;
  trashShippingPreset?: Maybe<Array<Maybe<ShippingPreset>>>;
  trashStore?: Maybe<Array<Maybe<Store>>>;
  trashUserGroup?: Maybe<Array<Maybe<UserGroup>>>;
  updateMockupDesign?: Maybe<MockupDesign>;
  updatePaypalItem?: Maybe<Array<Maybe<JobsList>>>;
  updatePreSignedFile?: Maybe<File>;
  /** User editer */
  updateProfile?: Maybe<User>;
  updateQuantityItem?: Maybe<Array<Maybe<JobsList>>>;
  updateTask?: Maybe<Task>;
  updateTaskStatus?: Maybe<Task>;
  updateUserShopifyInfo?: Maybe<ShopifyAuthorizeRedirect>;
  /** File Collection */
  uploadFile?: Maybe<File>;
  veroCreate?: Maybe<Array<Maybe<Vero>>>;
  veroEdit?: Maybe<Array<Maybe<Vero>>>;
  veroRemove?: Maybe<Array<Maybe<Vero>>>;
  /** Wish */
  wishRefreshToken?: Maybe<Store>;
};


export type RootMutationApplyDesignArgs = {
  task_id: Scalars['String'];
};


export type RootMutationApplyTaskDesignOrderArgs = {
  order_id?: InputMaybe<Scalars['String']>;
  order_line_item_id?: InputMaybe<Scalars['String']>;
  print_back?: InputMaybe<Scalars['String']>;
  print_front?: InputMaybe<Scalars['String']>;
  print_hood?: InputMaybe<Scalars['String']>;
  print_sleeve?: InputMaybe<Scalars['String']>;
};


export type RootMutationBulkItemInfoArgs = {
  collections?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  custom_preset_id?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  include_extend_images?: InputMaybe<Scalars['Boolean']>;
  include_size_chart?: InputMaybe<Scalars['Boolean']>;
  params?: InputMaybe<Array<InputMaybe<ItemInfoUpdate>>>;
  platform_category?: InputMaybe<Array<InputMaybe<PlatformCategoryInput>>>;
  platform_specifics?: InputMaybe<Array<InputMaybe<PlatformItemSpecificInput>>>;
  price?: InputMaybe<Scalars['Float']>;
  product_id?: InputMaybe<Scalars['String']>;
  shipping_preset?: InputMaybe<Scalars['String']>;
  size_chart?: InputMaybe<Scalars['String']>;
  size_chart_remove?: InputMaybe<Scalars['String']>;
  specifics?: InputMaybe<Array<InputMaybe<ItemSpecificInput>>>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  update_item_sku?: InputMaybe<Scalars['Boolean']>;
};


export type RootMutationClipartUpdatePreSignedFileArgs = {
  _id?: InputMaybe<Scalars['String']>;
};


export type RootMutationCloneCartArgs = {
  id: Scalars['String'];
};


export type RootMutationCloneOrderArgs = {
  id: Scalars['String'];
};


export type RootMutationConvertItemImagesArgs = {
  _id: Scalars['String'];
  image_id?: InputMaybe<Scalars['String']>;
  images_remove?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type RootMutationCreateCartArgs = {
  base?: InputMaybe<Scalars['String']>;
  billing?: InputMaybe<AddressInput>;
  customer_note?: InputMaybe<Scalars['String']>;
  discount_total?: InputMaybe<Scalars['String']>;
  line_items_input?: InputMaybe<Array<InputMaybe<OrderItemInput>>>;
  private_note?: InputMaybe<Scalars['String']>;
  shipping?: InputMaybe<AddressInput>;
  shipping_total?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  total_fee?: InputMaybe<Scalars['String']>;
  total_tax?: InputMaybe<Scalars['String']>;
};


export type RootMutationCreateEbayTemplateArgs = {
  components?: InputMaybe<Array<InputMaybe<EbayTemplateComponentInput>>>;
  document?: InputMaybe<Array<InputMaybe<EbayTemplateInput>>>;
  name?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
};


export type RootMutationCreateMessageArgs = {
  content?: InputMaybe<Scalars['String']>;
  readed?: InputMaybe<Scalars['Boolean']>;
  ref: Scalars['String'];
  ref_id: Scalars['String'];
  subject?: InputMaybe<Scalars['String']>;
  user_id?: InputMaybe<Scalars['String']>;
};


export type RootMutationCreateMockupDesignArgs = {
  height?: InputMaybe<Scalars['Float']>;
  image?: InputMaybe<Scalars['String']>;
  images?: InputMaybe<Array<InputMaybe<MockupImageInput>>>;
  name?: InputMaybe<Scalars['String']>;
  new_tags?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  prints?: InputMaybe<Array<InputMaybe<MockupPrintInput>>>;
  status?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  width?: InputMaybe<Scalars['Float']>;
};


export type RootMutationCreateOrderArgs = {
  base?: InputMaybe<Scalars['String']>;
  billing?: InputMaybe<AddressInput>;
  customer_note?: InputMaybe<Scalars['String']>;
  discount_total?: InputMaybe<Scalars['String']>;
  line_items_input?: InputMaybe<Array<InputMaybe<OrderItemInput>>>;
  platform_id?: InputMaybe<Scalars['String']>;
  private_note?: InputMaybe<Scalars['String']>;
  shipping?: InputMaybe<AddressInput>;
  shipping_total?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  total_fee?: InputMaybe<Scalars['String']>;
  total_tax?: InputMaybe<Scalars['String']>;
};


export type RootMutationCreateTaskArgs = {
  assignee?: InputMaybe<Scalars['String']>;
  category?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  design_sku?: InputMaybe<Scalars['String']>;
  due_date?: InputMaybe<Scalars['String']>;
  images?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  order_id?: InputMaybe<Scalars['String']>;
  order_line_item_id?: InputMaybe<Scalars['String']>;
  origin_image?: InputMaybe<Scalars['String']>;
  print_files?: InputMaybe<Array<InputMaybe<ImagePrintFileInput>>>;
  status?: InputMaybe<Scalars['String']>;
  task_type?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
  updated_at?: InputMaybe<Scalars['String']>;
};


export type RootMutationCreateUserArgs = {
  confirm_password?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  permission?: InputMaybe<Scalars['JSON']>;
};


export type RootMutationDeleteByIdArgs = {
  _id?: InputMaybe<Scalars['String']>;
};


export type RootMutationDeleteEbayTemplateArgs = {
  _id?: InputMaybe<Scalars['String']>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type RootMutationDeleteNetworkCollectionArgs = {
  _id?: InputMaybe<Scalars['String']>;
};


export type RootMutationDeletePaypalArgs = {
  ids: Array<InputMaybe<Scalars['String']>>;
};


export type RootMutationDeleteTaskArgs = {
  _id: Scalars['String'];
};


export type RootMutationDesignRequestArgs = {
  ticketRaw: Scalars['String'];
};


export type RootMutationDesignRequestMessageArgs = {
  messageRaw: Scalars['String'];
};


export type RootMutationDockerMakeArgs = {
  annually?: InputMaybe<Scalars['Boolean']>;
  coupon?: InputMaybe<Scalars['String']>;
  domain?: InputMaybe<Scalars['String']>;
  hiden?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  label?: InputMaybe<Scalars['String']>;
  onos_email?: InputMaybe<Scalars['String']>;
  plan?: InputMaybe<Scalars['String']>;
  server?: InputMaybe<Scalars['String']>;
  sku?: InputMaybe<Scalars['String']>;
  sku_label?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  users?: InputMaybe<DockerUserInput>;
};


export type RootMutationDockerTrashArgs = {
  id?: InputMaybe<Scalars['String']>;
};


export type RootMutationEraseImageArgs = {
  _id: Scalars['String'];
  background?: InputMaybe<Scalars['Upload']>;
  image: Scalars['String'];
};


export type RootMutationFontUpdatePreSignedFileArgs = {
  family?: InputMaybe<Scalars['String']>;
  variants?: InputMaybe<Array<InputMaybe<InputFontFile>>>;
};


export type RootMutationFulfilmentOrderArgs = {
  fulfilment_id?: InputMaybe<Scalars['String']>;
  ids: Array<InputMaybe<Scalars['String']>>;
  shipping_method?: InputMaybe<Scalars['String']>;
};


export type RootMutationGenerateImageMaskArgs = {
  file: Scalars['Upload'];
  file_ids?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  height?: InputMaybe<Scalars['Float']>;
  position?: InputMaybe<Scalars['String']>;
  width?: InputMaybe<Scalars['Float']>;
};


export type RootMutationHubSyncPaypalArgs = {
  hub?: InputMaybe<Scalars['String']>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type RootMutationJobItemArgs = {
  ids?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  store_ids?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type RootMutationJobsRemoveArgs = {
  ids?: InputMaybe<Array<InputMaybe<JobRemoveInput>>>;
};


export type RootMutationJobsStartArgs = {
  _id?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['Int']>;
  fulfilment_id?: InputMaybe<Scalars['String']>;
  store_id?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};


export type RootMutationJobsStopArgs = {
  _id?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['Int']>;
  fulfilment_id?: InputMaybe<Scalars['String']>;
  store_id?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};


export type RootMutationLoginArgs = {
  email?: InputMaybe<Scalars['String']>;
};


export type RootMutationMakeBigcommerceConfigurationArgs = {
  bigcommerce_client_id?: InputMaybe<Scalars['String']>;
  bigcommerce_client_secret?: InputMaybe<Scalars['String']>;
};


export type RootMutationMakeBlogArgs = {
  content?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};


export type RootMutationMakeCartArgs = {
  billing?: InputMaybe<AddressInput>;
  cancel_fulfilment?: InputMaybe<Scalars['Boolean']>;
  customer_note?: InputMaybe<Scalars['String']>;
  defer_tracking?: InputMaybe<Scalars['String']>;
  external_folder?: InputMaybe<ExternalFolderInput>;
  id: Scalars['String'];
  print?: InputMaybe<Array<InputMaybe<PrintInput>>>;
  print_attribute?: InputMaybe<Array<InputMaybe<PrintAttributeInput>>>;
  print_remove?: InputMaybe<Array<InputMaybe<PrintRemoveInput>>>;
  private_note?: InputMaybe<Scalars['String']>;
  shipping?: InputMaybe<AddressInput>;
  status?: InputMaybe<Scalars['String']>;
  tracking?: InputMaybe<TrackingInput>;
};


export type RootMutationMakeConfigurationArgs = {
  ebay_client_id?: InputMaybe<Scalars['String']>;
  ebay_client_id_sandbox?: InputMaybe<Scalars['String']>;
  ebay_client_secret?: InputMaybe<Scalars['String']>;
  ebay_client_secret_sandbox?: InputMaybe<Scalars['String']>;
  ebay_runame?: InputMaybe<Scalars['String']>;
  ebay_runame_sandbox?: InputMaybe<Scalars['String']>;
  ebay_sandbox?: InputMaybe<Scalars['String']>;
};


export type RootMutationMakeCustomerArgs = {
  delete_ids?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  id?: InputMaybe<Scalars['String']>;
  params?: InputMaybe<CustomerInput>;
};


export type RootMutationMakeCustomersArgs = {
  params?: InputMaybe<Array<InputMaybe<CustomerInput>>>;
};


export type RootMutationMakeEmailContentArgs = {
  content?: InputMaybe<Scalars['String']>;
  delete_ids?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  subject?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};


export type RootMutationMakeEtsyConfigurationArgs = {
  etsy_keystring?: InputMaybe<Scalars['String']>;
  etsy_runame?: InputMaybe<Scalars['String']>;
  etsy_shared_secret?: InputMaybe<Scalars['String']>;
};


export type RootMutationMakeEtsyKeyArgs = {
  delete_ids?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  id?: InputMaybe<Scalars['String']>;
  params?: InputMaybe<EtsyKeyInput>;
};


export type RootMutationMakeEtsyKeysArgs = {
  params?: InputMaybe<Array<InputMaybe<EtsyKeyInput>>>;
};


export type RootMutationMakeFulfilmentArgs = {
  auto?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  params?: InputMaybe<FulfilmentInput>;
  status?: InputMaybe<Scalars['String']>;
};


export type RootMutationMakeItemInfoArgs = {
  _id?: InputMaybe<Scalars['String']>;
  attribute_specifics?: InputMaybe<Array<InputMaybe<SpecificAttributeInput>>>;
  attribute_specifics_modify?: InputMaybe<Array<InputMaybe<SpecificAttributeInput>>>;
  attributes?: InputMaybe<Array<InputMaybe<ItemPretyAttributeInput>>>;
  back?: InputMaybe<Scalars['Upload']>;
  barcode?: InputMaybe<Scalars['String']>;
  barcode_type?: InputMaybe<Scalars['String']>;
  collections?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  custom_name?: InputMaybe<Scalars['Boolean']>;
  description?: InputMaybe<Scalars['String']>;
  description_ai?: InputMaybe<Scalars['String']>;
  description_ai_pos?: InputMaybe<Scalars['String']>;
  extend_images?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  fix_profit?: InputMaybe<Scalars['Float']>;
  fixed_profit?: InputMaybe<Scalars['Float']>;
  front?: InputMaybe<Scalars['Upload']>;
  hood?: InputMaybe<Scalars['Upload']>;
  images?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  images_upload?: InputMaybe<Array<InputMaybe<Scalars['Upload']>>>;
  include_extend_images?: InputMaybe<Scalars['Boolean']>;
  include_size_chart?: InputMaybe<Scalars['Boolean']>;
  item_id?: InputMaybe<Scalars['String']>;
  mockup_id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  package_height?: InputMaybe<Scalars['Float']>;
  package_length?: InputMaybe<Scalars['Float']>;
  package_width?: InputMaybe<Scalars['Float']>;
  platform_category?: InputMaybe<Array<InputMaybe<PlatformCategoryInput>>>;
  platform_specifics?: InputMaybe<Array<InputMaybe<PlatformItemSpecificInput>>>;
  plf_price?: InputMaybe<Scalars['Float']>;
  price?: InputMaybe<Scalars['Float']>;
  price_addition?: InputMaybe<Scalars['Float']>;
  product_id?: InputMaybe<Scalars['String']>;
  shipping_preset?: InputMaybe<Scalars['String']>;
  size_chart?: InputMaybe<Scalars['Upload']>;
  size_chart_remove?: InputMaybe<Scalars['String']>;
  sku?: InputMaybe<Scalars['String']>;
  sleeve?: InputMaybe<Scalars['Upload']>;
  specifics?: InputMaybe<Array<InputMaybe<ItemSpecificInput>>>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  tax_fee?: InputMaybe<Scalars['Float']>;
  tax_fee_fix?: InputMaybe<Scalars['Float']>;
  type?: InputMaybe<Scalars['String']>;
  weight?: InputMaybe<Scalars['Float']>;
};


export type RootMutationMakeItemPresetArgs = {
  _id?: InputMaybe<Scalars['String']>;
  attribute_specifics?: InputMaybe<Array<InputMaybe<SpecificAttributeInput>>>;
  attribute_specifics_modify?: InputMaybe<Array<InputMaybe<SpecificAttributeInput>>>;
  attributes?: InputMaybe<Array<InputMaybe<ItemPretyAttributeInput>>>;
  collections?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  custom_name?: InputMaybe<Scalars['Boolean']>;
  description?: InputMaybe<Scalars['String']>;
  extend_images?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  fix_profit?: InputMaybe<Scalars['Float']>;
  fixed_profit?: InputMaybe<Scalars['Float']>;
  include_extend_images?: InputMaybe<Scalars['Boolean']>;
  include_size_chart?: InputMaybe<Scalars['Boolean']>;
  item_id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  platform_category?: InputMaybe<Array<InputMaybe<PlatformCategoryInput>>>;
  platform_specifics?: InputMaybe<Array<InputMaybe<PlatformItemSpecificInput>>>;
  plf_price?: InputMaybe<Scalars['Float']>;
  price?: InputMaybe<Scalars['Float']>;
  price_addition?: InputMaybe<Scalars['Float']>;
  product_id?: InputMaybe<Scalars['String']>;
  shipping_preset?: InputMaybe<Scalars['String']>;
  size_chart?: InputMaybe<Scalars['Upload']>;
  size_chart_remove?: InputMaybe<Scalars['String']>;
  specifics?: InputMaybe<Array<InputMaybe<ItemSpecificInput>>>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  tax_fee?: InputMaybe<Scalars['Float']>;
  tax_fee_fix?: InputMaybe<Scalars['Float']>;
  type?: InputMaybe<Scalars['String']>;
};


export type RootMutationMakeListCustomArgs = {
  delete_ids?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  id?: InputMaybe<Scalars['String']>;
  params?: InputMaybe<ListCustomInput>;
};


export type RootMutationMakeListCustomsArgs = {
  params?: InputMaybe<Array<InputMaybe<ListCustomInput>>>;
};


export type RootMutationMakeMessengerArgs = {
  content?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  readed?: InputMaybe<Scalars['Boolean']>;
  star?: InputMaybe<Scalars['Boolean']>;
  status?: InputMaybe<Scalars['String']>;
};


export type RootMutationMakeMockupPreviewArgs = {
  item_info_id?: InputMaybe<Scalars['String']>;
  preset_id?: InputMaybe<Scalars['String']>;
  side?: InputMaybe<InputProductMockupSide>;
};


export type RootMutationMakeOrderArgs = {
  base_manual?: InputMaybe<Scalars['String']>;
  base_ship_total_manual?: InputMaybe<Scalars['String']>;
  billing?: InputMaybe<AddressInput>;
  cancel_fulfilment?: InputMaybe<Scalars['Boolean']>;
  currency?: InputMaybe<Scalars['String']>;
  customer_note?: InputMaybe<Scalars['String']>;
  defer_tracking?: InputMaybe<Scalars['String']>;
  external_folder?: InputMaybe<ExternalFolderInput>;
  fulfilment_state?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  line_items_input?: InputMaybe<Array<InputMaybe<OrderItemInput>>>;
  paid?: InputMaybe<Scalars['Boolean']>;
  print?: InputMaybe<Array<InputMaybe<PrintInput>>>;
  print_attribute?: InputMaybe<Array<InputMaybe<PrintAttributeInput>>>;
  print_remove?: InputMaybe<Array<InputMaybe<PrintRemoveInput>>>;
  private_note?: InputMaybe<Scalars['String']>;
  remember_print_attribute?: InputMaybe<Scalars['Boolean']>;
  shipping?: InputMaybe<AddressInput>;
  status?: InputMaybe<Scalars['String']>;
  total_fee?: InputMaybe<Scalars['String']>;
  total_fee_ad?: InputMaybe<Scalars['String']>;
  total_fee_ex?: InputMaybe<Scalars['String']>;
  tracking?: InputMaybe<TrackingInput>;
};


export type RootMutationMakePaypalArgs = {
  auto_sync?: InputMaybe<Scalars['String']>;
  balance?: InputMaybe<Scalars['Float']>;
  bank_status?: InputMaybe<Scalars['String']>;
  client?: InputMaybe<Scalars['String']>;
  date_180?: InputMaybe<Scalars['String']>;
  doc_status?: InputMaybe<Scalars['String']>;
  emails?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  external_store?: InputMaybe<Scalars['String']>;
  hold?: InputMaybe<Scalars['Float']>;
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  private_note?: InputMaybe<Scalars['String']>;
  secret?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  store_id?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
  verify_status?: InputMaybe<Scalars['String']>;
};


export type RootMutationMakePrivateArgs = {
  billing?: InputMaybe<AddressInput>;
  customer_note?: InputMaybe<Scalars['String']>;
  defer_tracking?: InputMaybe<Scalars['String']>;
  external_folder?: InputMaybe<ExternalFolderInput>;
  id?: InputMaybe<Scalars['String']>;
  print?: InputMaybe<Array<InputMaybe<PrintInput>>>;
  print_attribute?: InputMaybe<Array<InputMaybe<PrintAttributeInput>>>;
  print_remove?: InputMaybe<Array<InputMaybe<PrintRemoveInput>>>;
  private_note?: InputMaybe<Scalars['String']>;
  raw?: InputMaybe<Scalars['String']>;
  shipping?: InputMaybe<AddressInput>;
  status?: InputMaybe<Scalars['String']>;
  tracking?: InputMaybe<TrackingInput>;
};


export type RootMutationMakeProductMockupArgs = {
  _id?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  images?: InputMaybe<Array<InputMaybe<InputFile>>>;
  item_info_id?: InputMaybe<Scalars['String']>;
  mockup_type?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  preset_id?: InputMaybe<Scalars['String']>;
  product_id?: InputMaybe<Scalars['String']>;
  provider?: InputMaybe<Scalars['String']>;
  sides?: InputMaybe<Array<InputMaybe<InputProductMockupSide>>>;
  sku?: InputMaybe<Scalars['String']>;
  src?: InputMaybe<Scalars['String']>;
};


export type RootMutationMakeProductMockupPresetArgs = {
  _id?: InputMaybe<Scalars['String']>;
  images?: InputMaybe<Array<InputMaybe<InputFile>>>;
  mockup_type?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  product_id?: InputMaybe<Scalars['String']>;
  provider?: InputMaybe<Scalars['String']>;
  sides?: InputMaybe<Array<InputMaybe<InputProductMockupSide>>>;
  sku?: InputMaybe<Scalars['String']>;
  src?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
};


export type RootMutationMakeRandomIdArgs = {
  prefix?: InputMaybe<Scalars['String']>;
};


export type RootMutationMakeShippingLabelArgs = {
  order_id?: InputMaybe<Scalars['String']>;
};


export type RootMutationMakeShippingPresetArgs = {
  country?: InputMaybe<Scalars['String']>;
  default_quantity?: InputMaybe<Scalars['String']>;
  dispatch_time_max?: InputMaybe<Scalars['String']>;
  global_shipping?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  international_location?: InputMaybe<Scalars['String']>;
  international_return_accept?: InputMaybe<Scalars['String']>;
  international_shipping_additional_cost?: InputMaybe<Scalars['String']>;
  international_shipping_cost?: InputMaybe<Scalars['String']>;
  international_shipping_service?: InputMaybe<Scalars['String']>;
  international_shipping_time_max?: InputMaybe<Scalars['String']>;
  location?: InputMaybe<Scalars['String']>;
  location_detail?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  return_accept?: InputMaybe<Scalars['String']>;
  shipping_additional_cost?: InputMaybe<Scalars['String']>;
  shipping_cost?: InputMaybe<Scalars['String']>;
  shipping_service?: InputMaybe<Scalars['String']>;
  shipping_time_max?: InputMaybe<Scalars['String']>;
};


export type RootMutationMakeStoreArgs = {
  SMTPHost?: InputMaybe<Scalars['String']>;
  SMTPPassword?: InputMaybe<Scalars['String']>;
  SMTPPort?: InputMaybe<Scalars['String']>;
  SMTPSender?: InputMaybe<Scalars['String']>;
  SMTPStatus?: InputMaybe<Scalars['Boolean']>;
  SMTPUser?: InputMaybe<Scalars['String']>;
  banner_image_id?: InputMaybe<Scalars['String']>;
  brand_name?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  default_quantity?: InputMaybe<Scalars['String']>;
  dispatch_time_max?: InputMaybe<Scalars['String']>;
  ebay_template_id?: InputMaybe<Scalars['String']>;
  etsy_shipping?: InputMaybe<EtsyShippingInput>;
  global_shipping?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  ignore_publish?: InputMaybe<Scalars['Boolean']>;
  ignore_watermark?: InputMaybe<Scalars['Boolean']>;
  international_location?: InputMaybe<Scalars['String']>;
  international_return_accept?: InputMaybe<Scalars['String']>;
  international_shipping_additional_cost?: InputMaybe<Scalars['String']>;
  international_shipping_cost?: InputMaybe<Scalars['String']>;
  international_shipping_service?: InputMaybe<Scalars['String']>;
  international_shipping_time_max?: InputMaybe<Scalars['String']>;
  last_total_product?: InputMaybe<Scalars['Int']>;
  location?: InputMaybe<Scalars['String']>;
  location_detail?: InputMaybe<Scalars['String']>;
  max_per_day?: InputMaybe<Scalars['Int']>;
  max_per_month?: InputMaybe<Scalars['Int']>;
  max_per_week?: InputMaybe<Scalars['Int']>;
  params?: InputMaybe<StoreInput>;
  paypal_email?: InputMaybe<Scalars['String']>;
  private_note?: InputMaybe<Scalars['String']>;
  product_footer?: InputMaybe<Scalars['String']>;
  product_header?: InputMaybe<Scalars['String']>;
  product_style?: InputMaybe<Scalars['String']>;
  return_accept?: InputMaybe<Scalars['String']>;
  schedule?: InputMaybe<Scalars['Int']>;
  schedule_days?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  schedule_fetch?: InputMaybe<Scalars['Int']>;
  shipping_additional_cost?: InputMaybe<Scalars['String']>;
  shipping_cost?: InputMaybe<Scalars['String']>;
  shipping_profile_id?: InputMaybe<Scalars['String']>;
  shipping_service?: InputMaybe<Scalars['String']>;
  shipping_time_max?: InputMaybe<Scalars['String']>;
  sto_auto?: InputMaybe<Scalars['String']>;
  sto_auto_fulfilment?: InputMaybe<Scalars['String']>;
  sto_auto_fulfilment_delay?: InputMaybe<Scalars['Int']>;
  sto_auto_messenger?: InputMaybe<Scalars['String']>;
  sto_auto_order?: InputMaybe<Scalars['String']>;
  sto_ebay_payment?: InputMaybe<Scalars['String']>;
  sto_mailer?: InputMaybe<Scalars['String']>;
  sto_mailer_secret?: InputMaybe<Scalars['String']>;
  sto_name?: InputMaybe<Scalars['String']>;
  sto_status?: InputMaybe<Scalars['String']>;
  sto_user?: InputMaybe<Scalars['String']>;
};


export type RootMutationMakeTransactionArgs = {
  id?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
};


export type RootMutationMakeUserArgs = {
  containers?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  id?: InputMaybe<Scalars['String']>;
  params?: InputMaybe<UserInput>;
};


export type RootMutationMakeUserGroupArgs = {
  id?: InputMaybe<Scalars['String']>;
  params?: InputMaybe<UserGroupInput>;
};


export type RootMutationMakeUserGroupsArgs = {
  params?: InputMaybe<Array<InputMaybe<UserGroupInput>>>;
};


export type RootMutationNetworkAuthorizeArgs = {
  account_id?: InputMaybe<Scalars['String']>;
};


export type RootMutationNotificationMakeArgs = {
  ids: Array<InputMaybe<Scalars['String']>>;
  status?: InputMaybe<Scalars['String']>;
};


export type RootMutationProductPresetCreateArgs = {
  print_area_id?: InputMaybe<Scalars['String']>;
  product_type_id: Scalars['String'];
  provider: Scalars['String'];
  provider_id?: InputMaybe<Scalars['String']>;
};


export type RootMutationProductPresetCreateByJsonArgs = {
  data: Scalars['String'];
};


export type RootMutationProductPresetPasteArgs = {
  data?: InputMaybe<Scalars['String']>;
};


export type RootMutationProductPresetRemoveArgs = {
  _id: Scalars['String'];
};


export type RootMutationProductPresetUpdateArgs = {
  _id: Scalars['String'];
  attribute_specifics?: InputMaybe<Array<InputMaybe<SpecificAttributeInput>>>;
  category?: InputMaybe<Scalars['String']>;
  collections?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  description?: InputMaybe<Scalars['String']>;
  extend_images?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  extend_images_upload?: InputMaybe<Array<InputMaybe<Scalars['Upload']>>>;
  favorite?: InputMaybe<Scalars['Boolean']>;
  fix_profit?: InputMaybe<Scalars['Float']>;
  fixed_profit?: InputMaybe<Scalars['Float']>;
  id?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['Upload']>;
  image_remove?: InputMaybe<Scalars['String']>;
  international_shipping_additional_cost?: InputMaybe<Scalars['Float']>;
  international_shipping_cost?: InputMaybe<Scalars['Float']>;
  name?: InputMaybe<Scalars['String']>;
  package_height?: InputMaybe<Scalars['Float']>;
  package_length?: InputMaybe<Scalars['Float']>;
  package_width?: InputMaybe<Scalars['Float']>;
  platform_category?: InputMaybe<Array<InputMaybe<PlatformCategoryInput>>>;
  platform_specifics?: InputMaybe<Array<InputMaybe<PlatformItemSpecificInput>>>;
  prety_attributes?: InputMaybe<Array<InputMaybe<ItemPretyAttributeInput>>>;
  price?: InputMaybe<Scalars['Float']>;
  price_addition?: InputMaybe<Scalars['Float']>;
  print_template?: InputMaybe<Scalars['String']>;
  shipping_additional_cost?: InputMaybe<Scalars['Float']>;
  shipping_cost?: InputMaybe<Scalars['Float']>;
  shipping_preset?: InputMaybe<Scalars['String']>;
  size_chart?: InputMaybe<Scalars['Upload']>;
  size_chart_remove?: InputMaybe<Scalars['String']>;
  specifics?: InputMaybe<Array<InputMaybe<ItemSpecificInput>>>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  tax_fee?: InputMaybe<Scalars['Float']>;
  tax_fee_fix?: InputMaybe<Scalars['Float']>;
  weight?: InputMaybe<Scalars['Float']>;
};


export type RootMutationPutItemToStoreArgs = {
  _id?: InputMaybe<Scalars['String']>;
  account_id?: InputMaybe<Scalars['String']>;
  account_name?: InputMaybe<Scalars['String']>;
  account_type?: InputMaybe<Scalars['String']>;
  store_id?: InputMaybe<Scalars['String']>;
};


export type RootMutationQueueItemArgs = {
  ids?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  platform?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  store_id?: InputMaybe<Scalars['String']>;
};


export type RootMutationQueueRemoveItemArgs = {
  ids: Array<InputMaybe<Scalars['String']>>;
};


export type RootMutationRemoveClipartArgs = {
  _id?: InputMaybe<Scalars['String']>;
};


export type RootMutationRemoveFileArgs = {
  _id: Scalars['String'];
};


export type RootMutationRemoveItemInfoArgs = {
  ids: Array<InputMaybe<Scalars['String']>>;
};


export type RootMutationRemoveItemPresetArgs = {
  _id?: InputMaybe<Scalars['String']>;
};


export type RootMutationRemoveProductMockupPresetArgs = {
  _id?: InputMaybe<Scalars['String']>;
};


export type RootMutationReplyMessengerArgs = {
  content?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
};


export type RootMutationSaveDesignArgs = {
  _id?: InputMaybe<Scalars['String']>;
  images?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  print_files?: InputMaybe<Array<InputMaybe<DesignPrintFileInput>>>;
  sku?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type RootMutationSaveEbayTemplateArgs = {
  _id?: InputMaybe<Scalars['String']>;
  components?: InputMaybe<Array<InputMaybe<EbayTemplateComponentInput>>>;
  document?: InputMaybe<Array<InputMaybe<EbayTemplateInput>>>;
  name?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  stores?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type RootMutationSaveFileArgs = {
  _id: Scalars['String'];
  image_masks?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type RootMutationSaveNetworkCollectionArgs = {
  _id?: InputMaybe<Scalars['String']>;
  accounts?: InputMaybe<Array<Scalars['String']>>;
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};


export type RootMutationSendEmailsArgs = {
  orderStatus?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  productIds?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  storeId?: InputMaybe<Scalars['String']>;
  template?: InputMaybe<EmailTemplateInput>;
};


export type RootMutationSendMessengerArgs = {
  content?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  subject?: InputMaybe<Scalars['String']>;
};


export type RootMutationSetAppConfigArgs = {
  actions?: InputMaybe<Array<InputMaybe<AppConfigActionInput>>>;
  by: Scalars['String'];
  group?: InputMaybe<TelegramGroupInput>;
  keys?: InputMaybe<Array<InputMaybe<InputAppConfigKey>>>;
  status: Scalars['Boolean'];
  type: Scalars['String'];
  url?: InputMaybe<Scalars['String']>;
};


export type RootMutationSettingEmailContentArgs = {
  has_complated?: InputMaybe<Scalars['String']>;
  has_imported?: InputMaybe<Scalars['String']>;
  has_tracking?: InputMaybe<Scalars['String']>;
};


export type RootMutationSignedUploadArgs = {
  filename?: InputMaybe<Scalars['String']>;
  mimetype?: InputMaybe<Scalars['String']>;
  size?: InputMaybe<Scalars['Int']>;
  type?: InputMaybe<Scalars['String']>;
};


export type RootMutationSignedUploadClipartArgs = {
  filename?: InputMaybe<Scalars['String']>;
  mimetype?: InputMaybe<Scalars['String']>;
  size?: InputMaybe<Scalars['Int']>;
  type?: InputMaybe<Scalars['String']>;
};


export type RootMutationSignedUploadFontArgs = {
  family?: InputMaybe<Scalars['String']>;
  files?: InputMaybe<Array<InputMaybe<InputSignedUploadFont>>>;
};


export type RootMutationSplitCartArgs = {
  id: Scalars['String'];
  product_ids: Array<InputMaybe<Scalars['String']>>;
};


export type RootMutationSplitOrderArgs = {
  id: Scalars['String'];
  product_ids: Array<InputMaybe<Scalars['String']>>;
};


export type RootMutationStorageMakeArgs = {
  access_key?: InputMaybe<Scalars['String']>;
  access_key_id?: InputMaybe<Scalars['String']>;
  bucket?: InputMaybe<Scalars['String']>;
  region?: InputMaybe<Scalars['String']>;
};


export type RootMutationSubmitDesignTicketArgs = {
  _id?: InputMaybe<Scalars['String']>;
  assignee?: InputMaybe<Scalars['String']>;
  category?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  design_sku?: InputMaybe<Scalars['String']>;
  due_date?: InputMaybe<Scalars['String']>;
  images?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  order_id?: InputMaybe<Scalars['String']>;
  order_line_item_id?: InputMaybe<Scalars['String']>;
  origin_image?: InputMaybe<Scalars['String']>;
  print_files?: InputMaybe<Array<InputMaybe<ImagePrintFileInput>>>;
  status?: InputMaybe<Scalars['String']>;
  task_type?: InputMaybe<Scalars['String']>;
  ticket_id?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
  updated_at?: InputMaybe<Scalars['String']>;
};


export type RootMutationSyncCartArgs = {
  id: Scalars['String'];
};


export type RootMutationSyncOrderArgs = {
  id: Scalars['String'];
};


export type RootMutationSyncOrderPrintArgs = {
  id: Scalars['String'];
  index?: InputMaybe<Scalars['Int']>;
};


export type RootMutationSyncPaypalArgs = {
  id: Scalars['String'];
};


export type RootMutationTestBigcommerceKeyArgs = {
  bigcommerce_client_id: Scalars['String'];
  bigcommerce_client_secret: Scalars['String'];
};


export type RootMutationTestEtsyKeyArgs = {
  etsy_keystring: Scalars['String'];
  etsy_shared_secret: Scalars['String'];
};


export type RootMutationTopupAccountArgs = {
  amount?: InputMaybe<Scalars['Float']>;
  message?: InputMaybe<Scalars['String']>;
  payment_method?: InputMaybe<Scalars['String']>;
  payment_transaction_info?: InputMaybe<Scalars['String']>;
  user?: InputMaybe<Scalars['String']>;
};


export type RootMutationTrashCartArgs = {
  ids: Array<InputMaybe<Scalars['String']>>;
};


export type RootMutationTrashCustomerArgs = {
  delete_ids?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type RootMutationTrashEbayTemplateArgs = {
  _id?: InputMaybe<Scalars['String']>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type RootMutationTrashFulfilmentArgs = {
  ids: Array<InputMaybe<Scalars['String']>>;
};


export type RootMutationTrashMockupDesignArgs = {
  ids?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type RootMutationTrashOrderArgs = {
  ids: Array<InputMaybe<Scalars['String']>>;
};


export type RootMutationTrashPrivateArgs = {
  ids: Array<InputMaybe<Scalars['String']>>;
};


export type RootMutationTrashShippingPresetArgs = {
  ids: Array<InputMaybe<Scalars['String']>>;
};


export type RootMutationTrashStoreArgs = {
  ids: Array<InputMaybe<Scalars['String']>>;
};


export type RootMutationTrashUserGroupArgs = {
  delete_ids?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type RootMutationUpdateMockupDesignArgs = {
  _id?: InputMaybe<Scalars['String']>;
  height?: InputMaybe<Scalars['Float']>;
  image?: InputMaybe<Scalars['String']>;
  images?: InputMaybe<Array<InputMaybe<MockupImageInput>>>;
  name?: InputMaybe<Scalars['String']>;
  new_tags?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  prints?: InputMaybe<Array<InputMaybe<MockupPrintInput>>>;
  status?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  width?: InputMaybe<Scalars['Float']>;
};


export type RootMutationUpdatePaypalItemArgs = {
  email?: InputMaybe<Scalars['String']>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  store_id?: InputMaybe<Scalars['String']>;
};


export type RootMutationUpdatePreSignedFileArgs = {
  _id?: InputMaybe<Scalars['String']>;
};


export type RootMutationUpdateProfileArgs = {
  annually?: InputMaybe<Scalars['Boolean']>;
  customizer?: InputMaybe<CustomizerInput>;
  facebook?: InputMaybe<Scalars['String']>;
  h?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  new_password?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  phone_number?: InputMaybe<Scalars['String']>;
  plan?: InputMaybe<Scalars['String']>;
  sale_plan?: InputMaybe<Scalars['String']>;
  skype?: InputMaybe<Scalars['String']>;
};


export type RootMutationUpdateQuantityItemArgs = {
  platform_ids?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  quantity?: InputMaybe<Scalars['Int']>;
  store_id?: InputMaybe<Scalars['String']>;
};


export type RootMutationUpdateTaskArgs = {
  _id: Scalars['String'];
  assignee?: InputMaybe<Scalars['String']>;
  category?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  design_sku?: InputMaybe<Scalars['String']>;
  due_date?: InputMaybe<Scalars['String']>;
  images?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  order_id?: InputMaybe<Scalars['String']>;
  order_line_item_id?: InputMaybe<Scalars['String']>;
  origin_image?: InputMaybe<Scalars['String']>;
  print_files?: InputMaybe<Array<InputMaybe<ImagePrintFileInput>>>;
  status?: InputMaybe<Scalars['String']>;
  store_id?: InputMaybe<Scalars['String']>;
  store_line_item_id?: InputMaybe<Scalars['String']>;
  store_order_id?: InputMaybe<Scalars['String']>;
  task_type?: InputMaybe<Scalars['String']>;
  ticket_id?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
  updated_at?: InputMaybe<Scalars['String']>;
};


export type RootMutationUpdateTaskStatusArgs = {
  _id: Scalars['String'];
  status: Scalars['String'];
};


export type RootMutationUpdateUserShopifyInfoArgs = {
  _id?: InputMaybe<Scalars['String']>;
  shopify_shop_info?: InputMaybe<UserShopifyShopInfoInput>;
};


export type RootMutationUploadFileArgs = {
  file: Scalars['Upload'];
};


export type RootMutationVeroCreateArgs = {
  keywords?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  type?: InputMaybe<Scalars['String']>;
};


export type RootMutationVeroEditArgs = {
  id?: InputMaybe<Scalars['String']>;
  keyword?: InputMaybe<Scalars['String']>;
};


export type RootMutationVeroRemoveArgs = {
  ids: Array<InputMaybe<Scalars['String']>>;
};


export type RootMutationWishRefreshTokenArgs = {
  store_id?: InputMaybe<Scalars['String']>;
};

export type RootQuery = {
  __typename?: 'RootQuery';
  /** App config */
  appConfig?: Maybe<Array<Maybe<ResultAppConfig>>>;
  authorizeEtsyKey?: Maybe<EtsyKey>;
  authorizeEtsyKeyV3?: Maybe<EtsyKey>;
  bigcommerceConfiguration?: Maybe<BigCommerceConfiguration>;
  blogCount?: Maybe<Array<Maybe<BlogByStatus>>>;
  blogs?: Maybe<Array<Maybe<Blog>>>;
  cUser?: Maybe<User>;
  /** Cart */
  carts?: Maybe<Array<Maybe<Cart>>>;
  checkUserAccess?: Maybe<ResponseCheckUserAccess>;
  cliparts?: Maybe<Array<Maybe<Clipart>>>;
  collections?: Maybe<Array<Maybe<Collection>>>;
  configuration?: Maybe<Configuration>;
  countTasks?: Maybe<TaskCounter>;
  coupons?: Maybe<Coupon>;
  /** Customer */
  customer?: Maybe<Array<Maybe<Customer>>>;
  dashboardOrder?: Maybe<DashboardOrder>;
  dashboardOrderByStore?: Maybe<Array<Maybe<DashboardOrder>>>;
  dashboardOrderReportByStore?: Maybe<Array<Maybe<DashboardOrderReport>>>;
  dashboardPaypal?: Maybe<DashboardPaypal>;
  dashboardProfit?: Maybe<DashboardProfit>;
  dashboardSold?: Maybe<Array<Maybe<Item>>>;
  /** STATISTICS */
  dashboardStatistics?: Maybe<Statistic>;
  designQuery?: Maybe<Array<Maybe<DesignTasks>>>;
  /** Design */
  designs?: Maybe<Array<Maybe<Design>>>;
  /** Docker */
  dockers?: Maybe<Array<Maybe<Docker>>>;
  /** Ebay Template */
  ebayTemplate?: Maybe<EbayTemplate>;
  ebayTemplatePreview?: Maybe<EbayTemplatePreview>;
  ebayTemplates?: Maybe<Array<Maybe<EbayTemplate>>>;
  emailContent?: Maybe<Array<Maybe<Email>>>;
  emailSetting?: Maybe<EmailSetting>;
  /** Email Stores */
  emailStores?: Maybe<Array<Maybe<EmailStore>>>;
  /** Etsy Key */
  etsyKey?: Maybe<Array<Maybe<EtsyKey>>>;
  etsyShippingTemplates?: Maybe<Array<Maybe<EtsyShippingTemplate>>>;
  etsyconfiguration?: Maybe<EtsyConfiguration>;
  file?: Maybe<File>;
  fileBlob?: Maybe<FileBlob>;
  fileTags?: Maybe<Array<Maybe<FileTag>>>;
  /** File */
  files?: Maybe<Array<Maybe<File>>>;
  fonts?: Maybe<Array<Maybe<Font>>>;
  fulfillmentReport?: Maybe<Array<Maybe<DashboardProduction>>>;
  /** Fulfilment */
  fulfilments?: Maybe<Array<Maybe<Fulfilment>>>;
  getDefaultPermissions?: Maybe<Array<Maybe<Permission>>>;
  getMessages?: Maybe<Array<Maybe<Messenger>>>;
  getSendMailByStoreId?: Maybe<ResultStoreSendMail>;
  getUserByEmail?: Maybe<User>;
  getUserById?: Maybe<User>;
  info?: Maybe<Info>;
  invoiceCount?: Maybe<InvoiceByStatus>;
  invoices?: Maybe<Array<Maybe<Invoice>>>;
  /**
   * Item
   * External Item
   */
  items?: Maybe<Array<Maybe<Item>>>;
  itemsInfo?: Maybe<Array<Maybe<ItemInfo>>>;
  itemsLive?: Maybe<Array<Maybe<Item>>>;
  itemsPreset?: Maybe<Array<Maybe<ItemPreset>>>;
  jobGroups?: Maybe<Array<Maybe<Jobs>>>;
  jobs?: Maybe<Array<Maybe<Jobs>>>;
  jobslist?: Maybe<Array<Maybe<JobsList>>>;
  /** ListtingCustom */
  listCustom?: Maybe<Array<Maybe<ListCustom>>>;
  /** Messenger */
  messengers?: Maybe<Array<Maybe<Messenger>>>;
  messengersCount?: Maybe<Array<Maybe<MessengerCount>>>;
  mockupCounter?: Maybe<MockupCounter>;
  mockupDesign?: Maybe<MockupDesign>;
  mockupDesignCategories?: Maybe<Array<Maybe<MockupDesignCategory>>>;
  /** Mockup Design */
  mockupDesignTags?: Maybe<Array<Maybe<MockupDesignTag>>>;
  mockupDesigns?: Maybe<Array<Maybe<MockupDesign>>>;
  networkAccounts?: Maybe<Array<NetworkAccount>>;
  networkCollections?: Maybe<Array<NetworkCollection>>;
  notifications?: Maybe<Array<Maybe<Notification>>>;
  notificationsCount?: Maybe<NotificationCount>;
  orderItemTask?: Maybe<Task>;
  /** Order */
  orders?: Maybe<Array<Maybe<Order>>>;
  paypals?: Maybe<Array<Maybe<Paypal>>>;
  platformProductCategory?: Maybe<Array<Maybe<PlatformProductCategory>>>;
  platformProductCategorySearch?: Maybe<Array<Maybe<PlatformProductCategorySearch>>>;
  platformProductSpecifics?: Maybe<Array<Maybe<PlatformProductSpecifics>>>;
  /** Private */
  privateFulfilment?: Maybe<Array<Maybe<PrivateFulfilment>>>;
  productMockupPresets?: Maybe<Array<Maybe<ProductMockupPreset>>>;
  productMockups?: Maybe<Array<Maybe<ProductMockup>>>;
  productPreset?: Maybe<Array<Maybe<ProductPreset>>>;
  productPresetCount?: Maybe<DashboardProductPreset>;
  productPresetCountProvider?: Maybe<DashboardProductPresetProvider>;
  /** product type mockup template */
  productPresetMockupCountProvider?: Maybe<ProductPresetMockupProviderCount>;
  providerProductType?: Maybe<Array<Maybe<ProviderProductType>>>;
  providerProductTypePrintArea?: Maybe<Array<Maybe<ProviderProductTypePrintArea>>>;
  providerProductTypeProvider?: Maybe<Array<Maybe<ProviderProductTypeProvider>>>;
  /** Search order item query: added by task-manager */
  searchOrderItems?: Maybe<Array<Maybe<LineItem>>>;
  /** Send mail */
  sendEmails?: Maybe<ResultSendEmail>;
  /** Mulstran */
  shipments?: Maybe<Array<Maybe<Shipment>>>;
  shippingPreset?: Maybe<Array<Maybe<ShippingPreset>>>;
  shopifyUser?: Maybe<User>;
  storage?: Maybe<Storage>;
  storeCountQuery?: Maybe<StoreCounter>;
  storeTransactionSummaryLive?: Maybe<Store>;
  /** Store */
  stores?: Maybe<Array<Maybe<Store>>>;
  tags?: Maybe<Array<Maybe<Tag>>>;
  taskOrderTarget?: Maybe<TaskTarget>;
  taskService?: Maybe<TaskService>;
  /** Task */
  tasks?: Maybe<Array<Maybe<Task>>>;
  telegramGroup?: Maybe<Array<Maybe<TelegramGroup>>>;
  telegramUser?: Maybe<Array<Maybe<TelegramUser>>>;
  trackingMore?: Maybe<Array<Maybe<TrackingMore>>>;
  trackingMoreCounter?: Maybe<TrackingMoreCount>;
  transactionCount?: Maybe<TransactionByStatus>;
  transactionSum?: Maybe<Array<Maybe<TransactionByStore>>>;
  transactions?: Maybe<Array<Maybe<Transaction>>>;
  userPermissions?: Maybe<Array<Maybe<Permission>>>;
  usergroups?: Maybe<Array<Maybe<UserGroup>>>;
  users?: Maybe<Array<Maybe<User>>>;
  usersByName?: Maybe<Array<Maybe<User>>>;
  veroCheck?: Maybe<Array<Maybe<Vero>>>;
  veros?: Maybe<Array<Maybe<Vero>>>;
  /** Wish */
  wishAuthorizeRedirect?: Maybe<Wish>;
  workspaces?: Maybe<Array<Maybe<Workspace>>>;
};


export type RootQueryAppConfigArgs = {
  by?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  url?: InputMaybe<Scalars['String']>;
};


export type RootQueryAuthorizeEtsyKeyArgs = {
  _id?: InputMaybe<Scalars['String']>;
  etsy_keystring?: InputMaybe<Scalars['String']>;
  etsy_shared_secret?: InputMaybe<Scalars['String']>;
  re_authorize?: InputMaybe<Scalars['String']>;
  store_id?: InputMaybe<Scalars['String']>;
};


export type RootQueryAuthorizeEtsyKeyV3Args = {
  store_id?: InputMaybe<Scalars['String']>;
};


export type RootQueryBlogCountArgs = {
  content?: InputMaybe<Scalars['String']>;
  end?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  search?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};


export type RootQueryBlogsArgs = {
  content?: InputMaybe<Scalars['String']>;
  end?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  search?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};


export type RootQueryCartsArgs = {
  _id?: InputMaybe<Scalars['String']>;
  buyer?: InputMaybe<Scalars['String']>;
  end?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  platform?: InputMaybe<Scalars['String']>;
  product_id?: InputMaybe<Scalars['String']>;
  product_name?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  store_id?: InputMaybe<Scalars['String']>;
};


export type RootQueryCheckUserAccessArgs = {
  action: Scalars['String'];
  method: Scalars['String'];
};


export type RootQueryClipartsArgs = {
  _id?: InputMaybe<Scalars['String']>;
  category?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  provider?: InputMaybe<Scalars['String']>;
};


export type RootQueryCountTasksArgs = {
  task_type?: InputMaybe<Scalars['String']>;
};


export type RootQueryCouponsArgs = {
  code?: InputMaybe<Scalars['String']>;
  end?: InputMaybe<Scalars['String']>;
  fixed_value?: InputMaybe<Scalars['String']>;
  search?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};


export type RootQueryCustomerArgs = {
  email?: InputMaybe<Scalars['String']>;
  firstname?: InputMaybe<Scalars['String']>;
  group?: InputMaybe<Scalars['String']>;
  lastname?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  platform?: InputMaybe<Scalars['String']>;
  store_id?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type RootQueryDashboardOrderArgs = {
  date_type?: InputMaybe<Scalars['String']>;
  end?: InputMaybe<Scalars['String']>;
  ffm_only?: InputMaybe<Scalars['Boolean']>;
  ffm_provider?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['String']>;
  store_id?: InputMaybe<Scalars['String']>;
};


export type RootQueryDashboardOrderByStoreArgs = {
  end?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['String']>;
  store_id?: InputMaybe<Scalars['String']>;
};


export type RootQueryDashboardOrderReportByStoreArgs = {
  end?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['String']>;
};


export type RootQueryDashboardPaypalArgs = {
  bank_status?: InputMaybe<Scalars['String']>;
  client?: InputMaybe<Scalars['String']>;
  date_180?: InputMaybe<Scalars['String']>;
  doc_status?: InputMaybe<Scalars['String']>;
  external_store?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  secret?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  store_id?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
  verify_status?: InputMaybe<Scalars['String']>;
};


export type RootQueryDashboardProfitArgs = {
  end?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['String']>;
};


export type RootQueryDashboardSoldArgs = {
  end?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['String']>;
};


export type RootQueryDashboardStatisticsArgs = {
  date_type?: InputMaybe<Scalars['String']>;
  end?: InputMaybe<Scalars['String']>;
  range?: InputMaybe<Scalars['Boolean']>;
  start?: InputMaybe<Scalars['String']>;
  statistic_type?: InputMaybe<Scalars['String']>;
};


export type RootQueryDesignQueryArgs = {
  _id?: InputMaybe<Scalars['String']>;
};


export type RootQueryDesignsArgs = {
  _id?: InputMaybe<Scalars['String']>;
  created_by?: InputMaybe<Scalars['String']>;
  end?: InputMaybe<Scalars['String']>;
  search?: InputMaybe<Scalars['String']>;
  sku?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type RootQueryDockersArgs = {
  end?: InputMaybe<Scalars['String']>;
  search?: InputMaybe<Scalars['String']>;
  server?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};


export type RootQueryEbayTemplateArgs = {
  _id?: InputMaybe<Scalars['String']>;
};


export type RootQueryEbayTemplatePreviewArgs = {
  components?: InputMaybe<Array<InputMaybe<EbayTemplateComponentInput>>>;
  document?: InputMaybe<Array<InputMaybe<EbayTemplateInput>>>;
  item_id?: InputMaybe<Scalars['String']>;
  store_id?: InputMaybe<Scalars['String']>;
};


export type RootQueryEbayTemplatesArgs = {
  _id?: InputMaybe<Scalars['String']>;
  end?: InputMaybe<Scalars['String']>;
  ids?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
};


export type RootQueryEmailContentArgs = {
  content?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  subject?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};


export type RootQueryEmailStoresArgs = {
  id?: InputMaybe<Scalars['String']>;
  sto_name?: InputMaybe<Scalars['String']>;
  sto_status?: InputMaybe<Scalars['String']>;
};


export type RootQueryEtsyKeyArgs = {
  status?: InputMaybe<Scalars['String']>;
  store_id?: InputMaybe<Scalars['String']>;
  today_calling_totals?: InputMaybe<Scalars['String']>;
};


export type RootQueryEtsyShippingTemplatesArgs = {
  store_id: Scalars['String'];
};


export type RootQueryFileArgs = {
  _id?: InputMaybe<Scalars['String']>;
};


export type RootQueryFileBlobArgs = {
  url?: InputMaybe<Scalars['String']>;
};


export type RootQueryFileTagsArgs = {
  name?: InputMaybe<Scalars['String']>;
};


export type RootQueryFilesArgs = {
  _id?: InputMaybe<Scalars['String']>;
  created_by?: InputMaybe<Scalars['String']>;
  end?: InputMaybe<Scalars['String']>;
  height?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  onlyDesignCollection?: InputMaybe<Scalars['Boolean']>;
  provider?: InputMaybe<Scalars['String']>;
  sku?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  urls?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  width?: InputMaybe<Scalars['String']>;
};


export type RootQueryFontsArgs = {
  id?: InputMaybe<Scalars['String']>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  name?: InputMaybe<Scalars['String']>;
  provider?: InputMaybe<Scalars['String']>;
};


export type RootQueryFulfillmentReportArgs = {
  date_type?: InputMaybe<Scalars['String']>;
  end?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['String']>;
  store_id?: InputMaybe<Scalars['String']>;
};


export type RootQueryFulfilmentsArgs = {
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  private?: InputMaybe<Scalars['Boolean']>;
  status?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  types?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type RootQueryGetMessagesArgs = {
  created_at?: InputMaybe<Scalars['String']>;
  ref?: InputMaybe<Scalars['String']>;
  ref_id?: InputMaybe<Scalars['String']>;
};


export type RootQueryGetSendMailByStoreIdArgs = {
  id?: InputMaybe<Scalars['String']>;
};


export type RootQueryGetUserByEmailArgs = {
  email?: InputMaybe<Scalars['String']>;
};


export type RootQueryGetUserByIdArgs = {
  _id?: InputMaybe<Scalars['String']>;
};


export type RootQueryInvoiceCountArgs = {
  amount?: InputMaybe<Scalars['String']>;
  end?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  search?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  store_id?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};


export type RootQueryInvoicesArgs = {
  amount?: InputMaybe<Scalars['String']>;
  end?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  search?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  store_id?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};


export type RootQueryItemsArgs = {
  _id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  platform?: InputMaybe<Scalars['String']>;
  platform_id?: InputMaybe<Scalars['String']>;
  store?: InputMaybe<Scalars['String']>;
};


export type RootQueryItemsInfoArgs = {
  _id?: InputMaybe<Scalars['String']>;
  collection?: InputMaybe<Scalars['String']>;
  identities?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  identity?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  search?: InputMaybe<Scalars['String']>;
  store?: InputMaybe<Scalars['String']>;
};


export type RootQueryItemsLiveArgs = {
  _id?: InputMaybe<Scalars['String']>;
  store?: InputMaybe<Scalars['String']>;
};


export type RootQueryItemsPresetArgs = {
  _id?: InputMaybe<Scalars['String']>;
  category?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  provider?: InputMaybe<Scalars['String']>;
};


export type RootQueryJobGroupsArgs = {
  search?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};


export type RootQueryJobslistArgs = {
  created_at?: InputMaybe<Scalars['Int']>;
  fulfilment_id?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  store_id?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};


export type RootQueryListCustomArgs = {
  collections?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  percentage_discount?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  url?: InputMaybe<Scalars['String']>;
};


export type RootQueryMessengersArgs = {
  created_at?: InputMaybe<Scalars['String']>;
  end?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  order_id?: InputMaybe<Scalars['String']>;
  platform?: InputMaybe<Scalars['String']>;
  search?: InputMaybe<Scalars['String']>;
  sender?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  store_id?: InputMaybe<Scalars['String']>;
};


export type RootQueryMessengersCountArgs = {
  created_at?: InputMaybe<Scalars['String']>;
  end?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  order_id?: InputMaybe<Scalars['String']>;
  platform?: InputMaybe<Scalars['String']>;
  search?: InputMaybe<Scalars['String']>;
  sender?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  store_id?: InputMaybe<Scalars['String']>;
};


export type RootQueryMockupCounterArgs = {
  end?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['String']>;
  tag?: InputMaybe<Scalars['String']>;
};


export type RootQueryMockupDesignArgs = {
  _id?: InputMaybe<Scalars['String']>;
};


export type RootQueryMockupDesignCategoriesArgs = {
  end?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['String']>;
};


export type RootQueryMockupDesignTagsArgs = {
  name?: InputMaybe<Scalars['String']>;
};


export type RootQueryMockupDesignsArgs = {
  end?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  tag?: InputMaybe<Scalars['String']>;
};


export type RootQueryNetworkAccountsArgs = {
  type?: InputMaybe<Scalars['String']>;
};


export type RootQueryNetworkCollectionsArgs = {
  _id?: InputMaybe<Scalars['String']>;
};


export type RootQueryNotificationsArgs = {
  _id?: InputMaybe<Scalars['String']>;
  codes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  status?: InputMaybe<Scalars['String']>;
  types?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type RootQueryNotificationsCountArgs = {
  _id?: InputMaybe<Scalars['String']>;
  codes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  status?: InputMaybe<Scalars['String']>;
  types?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type RootQueryOrderItemTaskArgs = {
  category?: InputMaybe<Scalars['String']>;
  order_line_item_id?: InputMaybe<Scalars['String']>;
  task_type?: InputMaybe<Scalars['String']>;
  ticket_id?: InputMaybe<Scalars['String']>;
};


export type RootQueryOrdersArgs = {
  _id?: InputMaybe<Scalars['String']>;
  buyer?: InputMaybe<Scalars['String']>;
  date_type?: InputMaybe<Scalars['String']>;
  end?: InputMaybe<Scalars['String']>;
  ffm_only?: InputMaybe<Scalars['Boolean']>;
  ffm_provider?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  identity?: InputMaybe<Scalars['String']>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  order_tickets?: InputMaybe<Scalars['Boolean']>;
  platform?: InputMaybe<Scalars['String']>;
  product_id?: InputMaybe<Scalars['String']>;
  product_ids?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  product_name?: InputMaybe<Scalars['String']>;
  search?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  store_id?: InputMaybe<Scalars['String']>;
  tracking_status?: InputMaybe<Scalars['String']>;
};


export type RootQueryPaypalsArgs = {
  bank_status?: InputMaybe<Scalars['String']>;
  client?: InputMaybe<Scalars['String']>;
  date_180?: InputMaybe<Scalars['String']>;
  doc_status?: InputMaybe<Scalars['String']>;
  external_store?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  secret?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  store_id?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
  verify_status?: InputMaybe<Scalars['String']>;
};


export type RootQueryPlatformProductCategoryArgs = {
  level?: InputMaybe<Scalars['Int']>;
  parent?: InputMaybe<Scalars['String']>;
  platform: Scalars['String'];
};


export type RootQueryPlatformProductCategorySearchArgs = {
  platform: Scalars['String'];
  search: Scalars['String'];
};


export type RootQueryPlatformProductSpecificsArgs = {
  id: Scalars['String'];
  platform: Scalars['String'];
};


export type RootQueryPrivateFulfilmentArgs = {
  _id?: InputMaybe<Scalars['String']>;
  buyer?: InputMaybe<Scalars['String']>;
  end?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  platform?: InputMaybe<Scalars['String']>;
  product_id?: InputMaybe<Scalars['String']>;
  product_name?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  store_id?: InputMaybe<Scalars['String']>;
};


export type RootQueryProductMockupPresetsArgs = {
  _id?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Scalars['String']>;
  order_by?: InputMaybe<Scalars['String']>;
  preset_id?: InputMaybe<Scalars['String']>;
  product_id?: InputMaybe<Scalars['String']>;
  provider?: InputMaybe<Scalars['String']>;
  sku?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
};


export type RootQueryProductMockupsArgs = {
  _id?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  item_info_id?: InputMaybe<Scalars['String']>;
  preset_id?: InputMaybe<Scalars['String']>;
  product_id?: InputMaybe<Scalars['String']>;
};


export type RootQueryProductPresetArgs = {
  _id?: InputMaybe<Scalars['String']>;
  category?: InputMaybe<Scalars['String']>;
  favorite?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  provider?: InputMaybe<Scalars['String']>;
  requiredMockup?: InputMaybe<Scalars['Boolean']>;
  withoutCustom?: InputMaybe<Scalars['Boolean']>;
  withoutFulfillment?: InputMaybe<Scalars['Boolean']>;
};


export type RootQueryProductPresetCountArgs = {
  _id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  withoutCustom?: InputMaybe<Scalars['Boolean']>;
};


export type RootQueryProductPresetCountProviderArgs = {
  _id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  withoutCustom?: InputMaybe<Scalars['Boolean']>;
};


export type RootQueryProviderProductTypeArgs = {
  id?: InputMaybe<Scalars['String']>;
  provider: Scalars['String'];
};


export type RootQueryProviderProductTypePrintAreaArgs = {
  product_type_id: Scalars['String'];
  provider: Scalars['String'];
};


export type RootQueryProviderProductTypeProviderArgs = {
  product_type_id: Scalars['String'];
  provider: Scalars['String'];
};


export type RootQuerySearchOrderItemsArgs = {
  search?: InputMaybe<Scalars['String']>;
};


export type RootQuerySendEmailsArgs = {
  orderIdList?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  storeId?: InputMaybe<Scalars['String']>;
  templateId?: InputMaybe<Scalars['String']>;
};


export type RootQueryShipmentsArgs = {
  _id?: InputMaybe<Scalars['String']>;
  customer_name?: InputMaybe<Scalars['String']>;
  order_id?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  tracking_number?: InputMaybe<Scalars['String']>;
};


export type RootQueryShippingPresetArgs = {
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};


export type RootQueryShopifyUserArgs = {
  session?: InputMaybe<Scalars['String']>;
  shop?: InputMaybe<Scalars['String']>;
};


export type RootQueryStoreTransactionSummaryLiveArgs = {
  id?: InputMaybe<Scalars['String']>;
};


export type RootQueryStoresArgs = {
  id?: InputMaybe<Scalars['String']>;
  sto_name?: InputMaybe<Scalars['String']>;
  sto_status?: InputMaybe<Scalars['String']>;
  sto_type?: InputMaybe<Scalars['String']>;
};


export type RootQueryTaskOrderTargetArgs = {
  id?: InputMaybe<Scalars['String']>;
  order_id?: InputMaybe<Scalars['String']>;
  ref?: InputMaybe<Scalars['String']>;
};


export type RootQueryTaskServiceArgs = {
  order_id?: InputMaybe<Scalars['String']>;
  task_id?: InputMaybe<Scalars['String']>;
};


export type RootQueryTasksArgs = {
  _id?: InputMaybe<Scalars['String']>;
  assignee?: InputMaybe<Scalars['String']>;
  category?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  due_date?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Scalars['String']>;
  orderBy?: InputMaybe<Scalars['String']>;
  search?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};


export type RootQueryTelegramGroupArgs = {
  name?: InputMaybe<Scalars['String']>;
};


export type RootQueryTelegramUserArgs = {
  name?: InputMaybe<Scalars['String']>;
};


export type RootQueryTrackingMoreArgs = {
  _id?: InputMaybe<Scalars['String']>;
  customer_name?: InputMaybe<Scalars['String']>;
  end?: InputMaybe<Scalars['String']>;
  order_id?: InputMaybe<Scalars['String']>;
  search?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  tracking_number?: InputMaybe<Scalars['String']>;
};


export type RootQueryTrackingMoreCounterArgs = {
  _id?: InputMaybe<Scalars['String']>;
  customer_name?: InputMaybe<Scalars['String']>;
  end?: InputMaybe<Scalars['String']>;
  order_id?: InputMaybe<Scalars['String']>;
  search?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  tracking_number?: InputMaybe<Scalars['String']>;
};


export type RootQueryTransactionCountArgs = {
  amount?: InputMaybe<Scalars['String']>;
  end?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  referent?: InputMaybe<Scalars['String']>;
  search?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  store_id?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};


export type RootQueryTransactionSumArgs = {
  amount?: InputMaybe<Scalars['String']>;
  end?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  referent?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  store_id?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};


export type RootQueryTransactionsArgs = {
  amount?: InputMaybe<Scalars['String']>;
  end?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  referent?: InputMaybe<Scalars['String']>;
  search?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  store_id?: InputMaybe<Scalars['String']>;
  sub_referent_id?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};


export type RootQueryUsergroupsArgs = {
  get_all?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
};


export type RootQueryUsersArgs = {
  email?: InputMaybe<Scalars['String']>;
  end?: InputMaybe<Scalars['String']>;
  group?: InputMaybe<Scalars['String']>;
  identity?: InputMaybe<Scalars['String']>;
  search?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
};


export type RootQueryUsersByNameArgs = {
  name: Scalars['String'];
};


export type RootQueryVeroCheckArgs = {
  keyword?: InputMaybe<Scalars['String']>;
};


export type RootQueryVerosArgs = {
  keyword?: InputMaybe<Scalars['String']>;
};


export type RootQueryWishAuthorizeRedirectArgs = {
  client_id?: InputMaybe<Scalars['String']>;
  client_secret?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};


export type RootQueryWorkspacesArgs = {
  access_token?: InputMaybe<Scalars['String']>;
  refresh_token?: InputMaybe<Scalars['String']>;
};

export type RootSubscription = {
  __typename?: 'RootSubscription';
  messageAdded?: Maybe<Messenger>;
};


export type RootSubscriptionMessageAddedArgs = {
  ref_id: Scalars['String'];
};

export type Scalable = {
  __typename?: 'Scalable';
  key?: Maybe<Scalars['String']>;
};

/** input for create or update */
export type ScalableInput = {
  key: Scalars['String'];
};

export type SendMailConfig = {
  __typename?: 'SendMailConfig';
  password?: Maybe<Scalars['String']>;
  port?: Maybe<Scalars['String']>;
  stmpHost?: Maybe<Scalars['String']>;
  user?: Maybe<Scalars['String']>;
};

export type ServerList = {
  __typename?: 'ServerList';
  _id?: Maybe<Scalars['String']>;
  domain?: Maybe<Scalars['String']>;
  ip?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
  port?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
};

export type SettingNameValue = {
  __typename?: 'SettingNameValue';
  name?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type Shineon = {
  __typename?: 'Shineon';
  key?: Maybe<Scalars['String']>;
};

/** input for create or update */
export type ShineonInput = {
  key: Scalars['String'];
};

export type Shipment = {
  __typename?: 'Shipment';
  _id?: Maybe<Scalars['String']>;
  consigneeAddress?: Maybe<ConsigneeAddress>;
  created_at?: Maybe<Scalars['String']>;
  delivery?: Maybe<Array<Maybe<ShipmentTransit>>>;
  delivery_prediction?: Maybe<Scalars['String']>;
  detail?: Maybe<Array<Maybe<ShipmentTransit>>>;
  labelDetails?: Maybe<LabelDetails>;
  /** last_update: MulstranLastUpdate */
  last_update?: Maybe<Scalars['String']>;
  order_id?: Maybe<Scalars['String']>;
  shipping_city?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  transit?: Maybe<Array<Maybe<ShipmentTransit>>>;
};

export type ShipmentTransit = {
  __typename?: 'ShipmentTransit';
  datetime?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  time?: Maybe<Scalars['String']>;
};

export type ShippingLine = {
  __typename?: 'ShippingLine';
  meta_data?: Maybe<Array<Maybe<MetaData>>>;
  method_id?: Maybe<Scalars['String']>;
  method_title?: Maybe<Scalars['String']>;
  total?: Maybe<Scalars['String']>;
  total_tax?: Maybe<Scalars['String']>;
};

export type ShippingPreset = {
  __typename?: 'ShippingPreset';
  _id?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['Int']>;
  default_quantity?: Maybe<Scalars['String']>;
  dispatch_time_max?: Maybe<Scalars['String']>;
  global_shipping?: Maybe<Scalars['String']>;
  international_location?: Maybe<Scalars['String']>;
  international_return_accept?: Maybe<Scalars['String']>;
  international_shipping_additional_cost?: Maybe<Scalars['String']>;
  international_shipping_cost?: Maybe<Scalars['String']>;
  international_shipping_service?: Maybe<Scalars['String']>;
  international_shipping_time_max?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  location_detail?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  return_accept?: Maybe<Scalars['String']>;
  shipping_additional_cost?: Maybe<Scalars['String']>;
  shipping_cost?: Maybe<Scalars['String']>;
  shipping_service?: Maybe<Scalars['String']>;
  shipping_time_max?: Maybe<Scalars['String']>;
};

export type Shopify = {
  __typename?: 'Shopify';
  accessToken?: Maybe<Scalars['String']>;
  apiKey?: Maybe<Scalars['String']>;
  apiSecretKey?: Maybe<Scalars['String']>;
  shopName?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
};

export type ShopifyAssociatedUser = {
  __typename?: 'ShopifyAssociatedUser';
  account_owner?: Maybe<Scalars['Boolean']>;
  collaborator?: Maybe<Scalars['Boolean']>;
  email?: Maybe<Scalars['String']>;
  email_verified?: Maybe<Scalars['Boolean']>;
  first_name?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  last_name?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
};

export type ShopifyAuthorizeRedirect = {
  __typename?: 'ShopifyAuthorizeRedirect';
  shop_url?: Maybe<Scalars['String']>;
};

/** input for create or update */
export type ShopifyInput = {
  accessToken: Scalars['String'];
  apiKey?: InputMaybe<Scalars['String']>;
  apiSecretKey?: InputMaybe<Scalars['String']>;
  shopName: Scalars['String'];
  website: Scalars['String'];
};

export type ShopifyShopInfo = {
  __typename?: 'ShopifyShopInfo';
  access_token?: Maybe<Scalars['String']>;
  associated_user?: Maybe<ShopifyAssociatedUser>;
  associated_user_scope?: Maybe<Scalars['String']>;
  expires_at?: Maybe<Scalars['Int']>;
  scope?: Maybe<Scalars['String']>;
  session?: Maybe<Scalars['String']>;
};

export type SpecificAttribute = {
  __typename?: 'SpecificAttribute';
  barcode?: Maybe<Scalars['String']>;
  base_price?: Maybe<Scalars['Float']>;
  fix_profit?: Maybe<Scalars['Float']>;
  fixed_profit?: Maybe<Scalars['Float']>;
  image?: Maybe<File>;
  name_value?: Maybe<Array<Maybe<NameValueType>>>;
  sale_price?: Maybe<Scalars['Float']>;
  sku?: Maybe<Scalars['String']>;
};

export type SpecificAttributeImageInput = {
  _id?: InputMaybe<Scalars['String']>;
  image_sizes?: InputMaybe<Array<InputMaybe<SpecificAttributeImageSizeInput>>>;
  type?: InputMaybe<Scalars['String']>;
  url?: InputMaybe<Scalars['String']>;
};

export type SpecificAttributeImageSizeInput = {
  height?: InputMaybe<Scalars['Float']>;
  url?: InputMaybe<Scalars['String']>;
  width?: InputMaybe<Scalars['Float']>;
};

export type SpecificAttributeInput = {
  barcode?: InputMaybe<Scalars['String']>;
  base_price?: InputMaybe<Scalars['Float']>;
  fix_profit?: InputMaybe<Scalars['Float']>;
  fixed_profit?: InputMaybe<Scalars['Float']>;
  image?: InputMaybe<SpecificAttributeImageInput>;
  name_value?: InputMaybe<Array<InputMaybe<NameValueTypeInput>>>;
  sale_price?: InputMaybe<Scalars['Float']>;
  sku?: InputMaybe<Scalars['String']>;
};

export type Statistic = {
  __typename?: 'Statistic';
  lastSolds?: Maybe<Array<Maybe<Item>>>;
  ordersOverview?: Maybe<DashboardOrder>;
  platform_orders?: Maybe<PlatFormOrderTotal>;
  profit?: Maybe<DashboardProfit>;
  supports?: Maybe<Array<Maybe<Messenger>>>;
  totalOrders?: Maybe<OrderTotal>;
  transactions?: Maybe<Array<Maybe<TransactionDashboard>>>;
};

export enum Status {
  Invalid = 'Invalid',
  Lostconnection = 'Lostconnection',
  Trash = 'Trash',
  Valid = 'Valid'
}

export type Storage = {
  __typename?: 'Storage';
  access_key?: Maybe<Scalars['String']>;
  access_key_id?: Maybe<Scalars['String']>;
  bucket?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
};

export type Store = {
  __typename?: 'Store';
  _id?: Maybe<Scalars['String']>;
  banner_image_id?: Maybe<Scalars['String']>;
  brand_name?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  dead_state?: Maybe<Scalars['String']>;
  default_quantity?: Maybe<Scalars['String']>;
  dispatch_time_max?: Maybe<Scalars['String']>;
  ebay_template_id?: Maybe<Scalars['String']>;
  etsy_shipping?: Maybe<EtsyShipping>;
  fetched_at?: Maybe<Scalars['Int']>;
  global_shipping?: Maybe<Scalars['String']>;
  ignore_publish?: Maybe<Scalars['Boolean']>;
  ignore_watermark?: Maybe<Scalars['Boolean']>;
  international_location?: Maybe<Scalars['String']>;
  international_return_accept?: Maybe<Scalars['String']>;
  international_shipping_additional_cost?: Maybe<Scalars['String']>;
  international_shipping_cost?: Maybe<Scalars['String']>;
  international_shipping_service?: Maybe<Scalars['String']>;
  international_shipping_time_max?: Maybe<Scalars['String']>;
  item_per_day?: Maybe<Scalars['Int']>;
  item_per_month?: Maybe<Scalars['Int']>;
  item_per_week?: Maybe<Scalars['Int']>;
  last_push_item_at?: Maybe<Scalars['Int']>;
  last_total_product?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  location_detail?: Maybe<Scalars['String']>;
  max_per_day?: Maybe<Scalars['Int']>;
  max_per_month?: Maybe<Scalars['Int']>;
  max_per_week?: Maybe<Scalars['Int']>;
  paypal_email?: Maybe<Scalars['String']>;
  paypal_emails?: Maybe<Array<Maybe<Scalars['String']>>>;
  platform_id?: Maybe<Scalars['String']>;
  platform_name?: Maybe<Scalars['String']>;
  platform_open_id?: Maybe<Scalars['String']>;
  private_note?: Maybe<Scalars['String']>;
  product_footer?: Maybe<Scalars['String']>;
  product_header?: Maybe<Scalars['String']>;
  product_style?: Maybe<Scalars['String']>;
  return_accept?: Maybe<Scalars['String']>;
  schedule?: Maybe<Scalars['Int']>;
  schedule_days?: Maybe<Array<Maybe<Scalars['Int']>>>;
  schedule_fetch?: Maybe<Scalars['Int']>;
  shipping_additional_cost?: Maybe<Scalars['String']>;
  shipping_cost?: Maybe<Scalars['String']>;
  shipping_profile_id?: Maybe<Scalars['String']>;
  shipping_service?: Maybe<Scalars['String']>;
  shipping_time_max?: Maybe<Scalars['String']>;
  sto_amazon_type?: Maybe<Scalars['String']>;
  sto_auto?: Maybe<Scalars['String']>;
  sto_auto_fulfilment?: Maybe<Scalars['String']>;
  sto_auto_fulfilment_delay?: Maybe<Scalars['Int']>;
  sto_auto_messenger?: Maybe<Scalars['String']>;
  sto_auto_order?: Maybe<Scalars['String']>;
  sto_bigcommerce_config?: Maybe<BigCommerce>;
  sto_created_at?: Maybe<Scalars['Int']>;
  sto_ebay_config?: Maybe<Ebay>;
  sto_ebay_payment?: Maybe<Scalars['String']>;
  sto_etsy_config?: Maybe<Etsy>;
  sto_etsy_config_v3?: Maybe<EtsyV3>;
  sto_mailer?: Maybe<Scalars['String']>;
  sto_mailer_secret?: Maybe<Scalars['String']>;
  sto_merchize_config?: Maybe<MerchizeStore>;
  sto_name?: Maybe<Scalars['String']>;
  sto_shopify_config?: Maybe<Shopify>;
  sto_status?: Maybe<Status>;
  sto_tiktok_config?: Maybe<Tiktok>;
  sto_type?: Maybe<Scalars['String']>;
  sto_updated_at?: Maybe<Scalars['Int']>;
  sto_user?: Maybe<Scalars['String']>;
  sto_wish_config?: Maybe<Wish>;
  sto_woocommerce_config?: Maybe<Woocommerce>;
  total_order?: Maybe<Scalars['Int']>;
  transaction_summary?: Maybe<EbayTransactionSummary>;
  transaction_summary_at?: Maybe<Scalars['Int']>;
  user_owners?: Maybe<Array<Maybe<User>>>;
  warning_level?: Maybe<Scalars['Int']>;
};

export type StoreCounter = {
  __typename?: 'StoreCounter';
  all?: Maybe<Scalars['Int']>;
  invalid?: Maybe<Scalars['Int']>;
  lostconnection?: Maybe<Scalars['Int']>;
  valid?: Maybe<Scalars['Int']>;
};

export type StoreCustomerType = {
  __typename?: 'StoreCustomerType';
  created_at?: Maybe<Scalars['Int']>;
  customer_ip_address?: Maybe<Scalars['String']>;
  customer_user_agent?: Maybe<Scalars['String']>;
  platform?: Maybe<Scalars['String']>;
  platform_customer_id?: Maybe<Scalars['String']>;
  store_id?: Maybe<Scalars['String']>;
};

export type StoreInfoType = {
  __typename?: 'StoreInfoType';
  store_id?: Maybe<Scalars['String']>;
};

export type StoreInput = {
  sto_amazon_config?: InputMaybe<AmazonInput>;
  sto_bigcommerce_config?: InputMaybe<BigCommerceInput>;
  sto_ebay_config?: InputMaybe<EbayInput>;
  sto_etsy_config?: InputMaybe<EtsyInput>;
  sto_merchize_config?: InputMaybe<MerchizeStoreInput>;
  sto_shopify_config?: InputMaybe<ShopifyInput>;
  sto_tiktok_config?: InputMaybe<TiktokInput>;
  sto_wish_config?: InputMaybe<WishStoreInput>;
  sto_woocommerce_config?: InputMaybe<WoocommerceInput>;
};

export type Tag = {
  __typename?: 'Tag';
  _id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type Task = {
  __typename?: 'Task';
  _id?: Maybe<Scalars['String']>;
  applied?: Maybe<Scalars['Boolean']>;
  assignee?: Maybe<User>;
  category?: Maybe<Scalars['String']>;
  commentsCount?: Maybe<Scalars['Int']>;
  created_at?: Maybe<Scalars['String']>;
  created_by?: Maybe<User>;
  description?: Maybe<Scalars['String']>;
  design_aliased?: Maybe<Design>;
  design_aliased_id?: Maybe<Scalars['String']>;
  design_sku?: Maybe<Scalars['String']>;
  due_date?: Maybe<Scalars['String']>;
  images?: Maybe<Array<Maybe<FileImage>>>;
  order?: Maybe<Order>;
  order_id?: Maybe<Scalars['String']>;
  order_line_item_id?: Maybe<Scalars['String']>;
  origin_image?: Maybe<Scalars['String']>;
  print_files?: Maybe<Array<Maybe<PrintFileItem>>>;
  status?: Maybe<Scalars['String']>;
  store_id?: Maybe<Scalars['String']>;
  store_line_item_id?: Maybe<Scalars['String']>;
  store_order_id?: Maybe<Scalars['String']>;
  task_type?: Maybe<Scalars['String']>;
  /** design request only */
  ticket_id?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['String']>;
};

export type TaskCounter = {
  __typename?: 'TaskCounter';
  completed?: Maybe<Scalars['Int']>;
  libs?: Maybe<Scalars['Int']>;
  mine?: Maybe<Scalars['Int']>;
  orders?: Maybe<Scalars['Int']>;
  progress?: Maybe<Scalars['Int']>;
  rejected?: Maybe<Scalars['Int']>;
  resolved?: Maybe<Scalars['Int']>;
  review?: Maybe<Scalars['Int']>;
  service?: Maybe<Scalars['Int']>;
  todo?: Maybe<Scalars['Int']>;
  total?: Maybe<Scalars['Int']>;
};

export type TaskService = {
  __typename?: 'TaskService';
  _id?: Maybe<Scalars['String']>;
  board?: Maybe<TaskServiceBoard>;
  response_files?: Maybe<Array<Maybe<TaskServiceFile>>>;
  workspace_id?: Maybe<Scalars['String']>;
};

export type TaskServiceBoard = {
  __typename?: 'TaskServiceBoard';
  name?: Maybe<Scalars['String']>;
};

export type TaskServiceFile = {
  __typename?: 'TaskServiceFile';
  mimetype?: Maybe<Scalars['String']>;
  sizes?: Maybe<Array<Maybe<TaskServiceFileSize>>>;
  src?: Maybe<Scalars['String']>;
};

export type TaskServiceFileSize = {
  __typename?: 'TaskServiceFileSize';
  height?: Maybe<Scalars['Float']>;
  src?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Float']>;
};

/** output selected for Select component */
export type TaskTarget = {
  __typename?: 'TaskTarget';
  label?: Maybe<Scalars['String']>;
  order?: Maybe<Order>;
  title?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type TelegramChat = {
  __typename?: 'TelegramChat';
  id?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type TelegramGroup = {
  __typename?: 'TelegramGroup';
  id?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
};

export type TelegramGroupInput = {
  id?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type TelegramTime = {
  __typename?: 'TelegramTime';
  hour?: Maybe<Scalars['Int']>;
  minute?: Maybe<Scalars['Int']>;
};

export type TelegramUser = {
  __typename?: 'TelegramUser';
  first_name?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  last_name?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type TelegramUserInput = {
  first_name?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  last_name?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

export type Thread = {
  __typename?: 'Thread';
  content?: Maybe<Scalars['String']>;
  received_at?: Maybe<Scalars['String']>;
  sender?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type Tiktok = {
  __typename?: 'Tiktok';
  code?: Maybe<Scalars['String']>;
  expires_in?: Maybe<Scalars['String']>;
  refresh_token?: Maybe<Scalars['String']>;
  shop?: Maybe<TiktokShopList>;
  shop_list?: Maybe<Array<Maybe<TiktokShopList>>>;
  token?: Maybe<Scalars['String']>;
};

/** input for create or update */
export type TiktokInput = {
  code: Scalars['String'];
  shop_id?: InputMaybe<Scalars['String']>;
};

export type TiktokShopList = {
  __typename?: 'TiktokShopList';
  region?: Maybe<Scalars['String']>;
  shop_id?: Maybe<Scalars['String']>;
  shop_name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['Int']>;
};

export type TrackingInfoType = {
  __typename?: 'TrackingInfoType';
  date?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  detail?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  substatus?: Maybe<Scalars['String']>;
};

export type TrackingInput = {
  carrier?: InputMaybe<Scalars['String']>;
  fulfilment_name?: InputMaybe<Scalars['String']>;
  shipping_country_code?: InputMaybe<Scalars['String']>;
  tracking?: InputMaybe<Scalars['String']>;
  tracking_check?: InputMaybe<Scalars['Boolean']>;
  url?: InputMaybe<Scalars['String']>;
};

export type TrackingMore = {
  __typename?: 'TrackingMore';
  _id?: Maybe<Scalars['String']>;
  carrier_code?: Maybe<Scalars['String']>;
  checkpoint_status?: Maybe<Scalars['String']>;
  customer_email?: Maybe<Scalars['String']>;
  customer_name?: Maybe<Scalars['String']>;
  customer_phone?: Maybe<Scalars['String']>;
  date_follow?: Maybe<DateFollowType>;
  destination_country?: Maybe<Scalars['String']>;
  item_time_length?: Maybe<Scalars['Int']>;
  last_event?: Maybe<Scalars['String']>;
  logistics_channel?: Maybe<Scalars['String']>;
  order_id?: Maybe<Scalars['String']>;
  original_country?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  store?: Maybe<Store>;
  store_id?: Maybe<Scalars['String']>;
  substatus?: Maybe<Scalars['String']>;
  trackinfo?: Maybe<Array<Maybe<TrackingInfoType>>>;
  tracking_number?: Maybe<Scalars['String']>;
};

export type TrackingMoreCount = {
  __typename?: 'TrackingMoreCount';
  all?: Maybe<Scalars['Int']>;
  delivered?: Maybe<Scalars['Int']>;
  exception?: Maybe<Scalars['Int']>;
  expired?: Maybe<Scalars['Int']>;
  notfound?: Maybe<Scalars['Int']>;
  pending?: Maybe<Scalars['Int']>;
  pickup?: Maybe<Scalars['Int']>;
  transit?: Maybe<Scalars['Int']>;
  undelivered?: Maybe<Scalars['Int']>;
};

export type TrackingType = {
  __typename?: 'TrackingType';
  carrier?: Maybe<Scalars['String']>;
  fulfilment?: Maybe<Fulfilment>;
  fulfilment_at?: Maybe<Scalars['Int']>;
  fulfilment_id?: Maybe<Scalars['String']>;
  fulfilment_name?: Maybe<Scalars['String']>;
  multrans_logistics?: Maybe<Shipment>;
  order_platform_id?: Maybe<Scalars['String']>;
  order_platform_id_short?: Maybe<Scalars['String']>;
  shipping_country_code?: Maybe<Scalars['String']>;
  tracking?: Maybe<Scalars['String']>;
  tracking_at?: Maybe<Scalars['Int']>;
  tracking_more?: Maybe<TrackingMore>;
  url?: Maybe<Scalars['String']>;
};

export type Transaction = {
  __typename?: 'Transaction';
  _id?: Maybe<Scalars['String']>;
  amount?: Maybe<Scalars['Float']>;
  balance?: Maybe<Scalars['Float']>;
  created_at?: Maybe<Scalars['Int']>;
  currency?: Maybe<Scalars['String']>;
  events?: Maybe<Array<Maybe<TransactionEvent>>>;
  fee?: Maybe<Scalars['Float']>;
  fulfillment?: Maybe<Fulfilment>;
  invoice_id?: Maybe<Scalars['String']>;
  invoice_identity?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  order?: Maybe<Order>;
  order_created_at?: Maybe<Scalars['Int']>;
  paid_at?: Maybe<Scalars['Int']>;
  payment_method?: Maybe<Scalars['String']>;
  payment_status?: Maybe<Scalars['String']>;
  payment_transaction_info?: Maybe<Scalars['String']>;
  referent?: Maybe<Scalars['String']>;
  referent_id?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  store?: Maybe<Store>;
  store_id?: Maybe<Scalars['String']>;
  sub_message?: Maybe<Scalars['String']>;
  sub_referent_id?: Maybe<Scalars['String']>;
  sub_type?: Maybe<Scalars['String']>;
  transaction_id?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['Int']>;
  user?: Maybe<User>;
};

export type TransactionByStatus = {
  __typename?: 'TransactionByStatus';
  all?: Maybe<Scalars['Int']>;
  cancel?: Maybe<Scalars['Int']>;
  error?: Maybe<Scalars['Int']>;
  paid?: Maybe<Scalars['Int']>;
  pending?: Maybe<Scalars['Int']>;
};

export type TransactionByStore = {
  __typename?: 'TransactionByStore';
  store_id?: Maybe<Scalars['String']>;
  total_payment?: Maybe<Scalars['Float']>;
  total_refund?: Maybe<Scalars['Float']>;
  total_topup?: Maybe<Scalars['Float']>;
};

export type TransactionDashboard = {
  __typename?: 'TransactionDashboard';
  _id?: Maybe<Scalars['String']>;
};

export type TransactionEvent = {
  __typename?: 'TransactionEvent';
  date?: Maybe<Scalars['Date']>;
  event_id?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  _id?: Maybe<Scalars['String']>;
  auth_docker?: Maybe<Array<Maybe<AuthDocker>>>;
  containers?: Maybe<Array<Maybe<Scalars['String']>>>;
  created_at?: Maybe<Scalars['Int']>;
  created_by_user_id?: Maybe<Scalars['String']>;
  customizer?: Maybe<Customizer>;
  email?: Maybe<Scalars['String']>;
  facebook?: Maybe<Scalars['String']>;
  ffm_sku?: Maybe<Scalars['String']>;
  ffm_sku_label?: Maybe<Scalars['String']>;
  group?: Maybe<UserGroupInfo>;
  group_type?: Maybe<Scalars['String']>;
  group_type_id?: Maybe<Scalars['String']>;
  groups?: Maybe<Array<Maybe<Scalars['String']>>>;
  h?: Maybe<Scalars['String']>;
  identity?: Maybe<Scalars['String']>;
  identity_label?: Maybe<Scalars['String']>;
  is_default?: Maybe<Scalars['Int']>;
  last_login?: Maybe<Scalars['Int']>;
  max_hub?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  permission?: Maybe<Array<Maybe<Permission>>>;
  phone_number?: Maybe<Scalars['String']>;
  plan_config?: Maybe<Scalars['String']>;
  /**
   * user_type: String
   * active_status: String
   */
  product_preset_favorites?: Maybe<Array<Maybe<Scalars['String']>>>;
  role?: Maybe<Scalars['String']>;
  sale_plan?: Maybe<Scalars['String']>;
  ship_by_seller?: Maybe<Scalars['Boolean']>;
  skype?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
  total_credit?: Maybe<Scalars['Float']>;
  updated_at?: Maybe<Scalars['Int']>;
  verified?: Maybe<Scalars['Boolean']>;
  vip?: Maybe<Scalars['Int']>;
};

export type UserGroup = {
  __typename?: 'UserGroup';
  _id?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['Int']>;
  created_by_user_id?: Maybe<Scalars['String']>;
  is_default?: Maybe<Scalars['Int']>;
  is_root?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  parent_id?: Maybe<Scalars['String']>;
  permission?: Maybe<Array<Maybe<Permission>>>;
  role?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['Int']>;
};

export type UserGroupInfo = {
  __typename?: 'UserGroupInfo';
  _id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type UserGroupInput = {
  name?: InputMaybe<Scalars['String']>;
  parent_id?: InputMaybe<Scalars['String']>;
  permission?: InputMaybe<Array<InputMaybe<PermissionInput>>>;
  status?: InputMaybe<Scalars['String']>;
};

export type UserInput = {
  confirm_password?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  facebook?: InputMaybe<Scalars['String']>;
  groups?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  id?: InputMaybe<Scalars['String']>;
  identity_label?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  new_password?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  /**
   * active_status: String
   * user_type: String
   */
  phone_number?: InputMaybe<Scalars['String']>;
  sale_plan?: InputMaybe<Scalars['String']>;
  ship_by_seller?: InputMaybe<Scalars['Boolean']>;
  skype?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  vip?: InputMaybe<Scalars['Int']>;
};

export type UserShopifyShopInfoInput = {
  access_token?: InputMaybe<Scalars['String']>;
  expires_at?: InputMaybe<Scalars['Int']>;
  session?: InputMaybe<Scalars['String']>;
  shop?: InputMaybe<Scalars['String']>;
  uid?: InputMaybe<Scalars['Long']>;
};

export type Vero = {
  __typename?: 'Vero';
  _id?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['Int']>;
  keyword?: Maybe<Scalars['String']>;
  platform?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type Wish = {
  __typename?: 'Wish';
  access_token?: Maybe<Scalars['String']>;
  authorize_url?: Maybe<Scalars['String']>;
  client_id?: Maybe<Scalars['String']>;
  client_secret?: Maybe<Scalars['String']>;
  expiry_time?: Maybe<Scalars['String']>;
  merchant_id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  refresh_token?: Maybe<Scalars['String']>;
  scopes?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** input for create or update */
export type WishStoreInput = {
  access_token?: InputMaybe<Scalars['String']>;
  client_id: Scalars['String'];
  client_secret: Scalars['String'];
  code: Scalars['String'];
  redirect_uri: Scalars['String'];
};

export type Woocommerce = {
  __typename?: 'Woocommerce';
  key?: Maybe<Scalars['String']>;
  permissions?: Maybe<Scalars['String']>;
  secret?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
};

/** input for create or update */
export type WoocommerceInput = {
  key: Scalars['String'];
  secret: Scalars['String'];
  website: Scalars['String'];
};

export type Workspace = {
  __typename?: 'Workspace';
  _id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type SetSendMailConfigInput = {
  code: Scalars['String'];
};

export type TagInput = {
  _id?: InputMaybe<Scalars['String']>;
  back?: InputMaybe<Scalars['Upload']>;
  front?: InputMaybe<Scalars['Upload']>;
  hood?: InputMaybe<Scalars['Upload']>;
  sleeve?: InputMaybe<Scalars['Upload']>;
};

export type TaskInput = {
  description?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type DockerFragment = { __typename?: 'Docker', _id?: string | null, domain?: string | null, label?: string | null, server?: string | null, sku?: string | null };

export type DockerAuthFragment = { __typename?: 'DockerAuth', auth_id?: string | null, user?: { __typename?: 'User', _id?: string | null, email?: string | null, name?: string | null, identity?: string | null, identity_label?: string | null, role?: string | null, created_at?: number | null, token?: string | null, auth_docker?: Array<{ __typename?: 'AuthDocker', docker_id?: string | null, docker?: { __typename?: 'Docker', _id?: string | null, domain?: string | null, label?: string | null, server?: string | null, sku?: string | null } | null } | null> | null } | null };

export type InfoFragment = { __typename?: 'Info', extension_rule?: { __typename?: 'ExtensionRule', name?: string | null, images?: Array<{ __typename?: 'ExtensionRuleImage', block?: string | null, loop?: string | null, attr?: Array<string | null> | null } | null> | null, id?: Array<{ __typename?: 'ExtensionRuleId', block?: string | null, attr?: string | null } | null> | null, items?: Array<{ __typename?: 'ExtensionRuleItems', block?: string | null, loop?: string | null, url?: string | null, url_attr?: string | null, name?: string | null, name_attr?: string | null, image?: string | null, image_attr?: string | null } | null> | null } | null };

export type ExtensionRuleFragment = { __typename?: 'ExtensionRule', name?: string | null, images?: Array<{ __typename?: 'ExtensionRuleImage', block?: string | null, loop?: string | null, attr?: Array<string | null> | null } | null> | null, id?: Array<{ __typename?: 'ExtensionRuleId', block?: string | null, attr?: string | null } | null> | null, items?: Array<{ __typename?: 'ExtensionRuleItems', block?: string | null, loop?: string | null, url?: string | null, url_attr?: string | null, name?: string | null, name_attr?: string | null, image?: string | null, image_attr?: string | null } | null> | null };

export type ExtensionRuleImageFragment = { __typename?: 'ExtensionRuleImage', block?: string | null, loop?: string | null, attr?: Array<string | null> | null };

export type ExtensionRuleIdFragment = { __typename?: 'ExtensionRuleId', block?: string | null, attr?: string | null };

export type ExtensionRuleItemsFragment = { __typename?: 'ExtensionRuleItems', block?: string | null, loop?: string | null, url?: string | null, url_attr?: string | null, name?: string | null, name_attr?: string | null, image?: string | null, image_attr?: string | null };

export type ItemInfoFragment = { __typename?: 'ItemInfo', _id?: string | null, identity?: string | null, name?: string | null, description?: string | null, description_ai?: string | null, description_ai_pos?: string | null, front?: string | null, back?: string | null, sleeve?: string | null, hood?: string | null, type?: string | null, plf_price?: number | null, tags?: Array<string | null> | null, collections?: Array<string | null> | null, size_chart?: string | null, fix_profit?: number | null, fixed_profit?: number | null, tax_fee_fix?: number | null, tax_fee?: number | null, include_size_chart?: boolean | null, custom_name?: boolean | null, include_extend_images?: boolean | null, ebay_template_id?: string | null, sku?: string | null, barcode?: string | null, barcode_type?: string | null, price_addition?: number | null, price?: number | null, images?: Array<{ __typename?: 'Image', src?: string | null } | null> | null, prety_attributes?: Array<{ __typename?: 'PretyAttribute', attribute_type?: string | null, plf_attribute_name?: string | null, options?: Array<{ __typename?: 'PretyAttributeOption', ffm_value?: string | null, plf_value?: string | null, plf_price?: number | null, hex?: string | null, default?: boolean | null } | null> | null } | null> | null, specifics?: Array<{ __typename?: 'ItemSpecific', key?: string | null, value?: string | null, required?: string | null } | null> | null, attribute_specifics?: Array<{ __typename?: 'SpecificAttribute', sale_price?: number | null, base_price?: number | null, fix_profit?: number | null, fixed_profit?: number | null, sku?: string | null, barcode?: string | null, name_value?: Array<{ __typename?: 'NameValueType', name?: string | null, type?: string | null, value?: string | null } | null> | null } | null> | null, attribute_specifics_modify?: Array<{ __typename?: 'SpecificAttribute', sale_price?: number | null, base_price?: number | null, fix_profit?: number | null, fixed_profit?: number | null, sku?: string | null, barcode?: string | null, name_value?: Array<{ __typename?: 'NameValueType', name?: string | null, type?: string | null, value?: string | null } | null> | null } | null> | null, shipping_preset_info?: { __typename?: 'ShippingPreset', dispatch_time_max?: string | null, shipping_time_max?: string | null, location?: string | null, location_detail?: string | null, country?: string | null, shipping_service?: string | null, shipping_cost?: string | null, shipping_additional_cost?: string | null, return_accept?: string | null, global_shipping?: string | null, international_shipping_time_max?: string | null, international_location?: string | null, international_shipping_service?: string | null, international_shipping_cost?: string | null, international_shipping_additional_cost?: string | null, international_return_accept?: string | null, default_quantity?: string | null } | null, platform_category?: Array<{ __typename?: 'PlatformCategory', type?: string | null, category_selected?: Array<{ __typename?: 'PlatformCategorySelected', id?: string | null, level?: string | null, name?: string | null, parent?: string | null } | null> | null } | null> | null, platform_specifics?: Array<{ __typename?: 'PlatformItemSpecific', platform?: string | null, specifics?: Array<{ __typename?: 'ItemSpecific', key?: string | null, value?: string | null, required?: string | null } | null> | null } | null> | null, extend_images?: Array<{ __typename?: 'Image', src?: string | null } | null> | null };

export type SpecificAttributeFragment = { __typename?: 'SpecificAttribute', sale_price?: number | null, base_price?: number | null, fix_profit?: number | null, fixed_profit?: number | null, sku?: string | null, barcode?: string | null, name_value?: Array<{ __typename?: 'NameValueType', name?: string | null, type?: string | null, value?: string | null } | null> | null };

export type ItemSpecificFragment = { __typename?: 'ItemSpecific', key?: string | null, value?: string | null, required?: string | null };

export type OrderFragment = { __typename?: 'Order', _id?: string | null, platform?: string | null, platform_id?: string | null, identity?: string | null, status?: string | null };

export type ProductPresetFragment = { __typename?: 'ProductPreset', _id?: string | null, id?: string | null, name?: string | null };

export type UserFragment = { __typename?: 'User', _id?: string | null, email?: string | null, name?: string | null, identity?: string | null, identity_label?: string | null, role?: string | null, created_at?: number | null, token?: string | null, auth_docker?: Array<{ __typename?: 'AuthDocker', docker_id?: string | null, docker?: { __typename?: 'Docker', _id?: string | null, domain?: string | null, label?: string | null, server?: string | null, sku?: string | null } | null } | null> | null };

export type AuthDockerFragment = { __typename?: 'AuthDocker', docker_id?: string | null, docker?: { __typename?: 'Docker', _id?: string | null, domain?: string | null, label?: string | null, server?: string | null, sku?: string | null } | null };

export type PutItemToStoreMutationVariables = Exact<{
  _id?: InputMaybe<Scalars['String']>;
  account_id?: InputMaybe<Scalars['String']>;
  account_name?: InputMaybe<Scalars['String']>;
  account_type?: InputMaybe<Scalars['String']>;
}>;


export type PutItemToStoreMutation = { __typename?: 'RootMutation', putItemToStore?: { __typename?: 'ItemInfo', _id?: string | null, identity?: string | null, name?: string | null, description?: string | null, description_ai?: string | null, description_ai_pos?: string | null, front?: string | null, back?: string | null, sleeve?: string | null, hood?: string | null, type?: string | null, plf_price?: number | null, tags?: Array<string | null> | null, collections?: Array<string | null> | null, size_chart?: string | null, fix_profit?: number | null, fixed_profit?: number | null, tax_fee_fix?: number | null, tax_fee?: number | null, include_size_chart?: boolean | null, custom_name?: boolean | null, include_extend_images?: boolean | null, ebay_template_id?: string | null, sku?: string | null, barcode?: string | null, barcode_type?: string | null, price_addition?: number | null, price?: number | null, images?: Array<{ __typename?: 'Image', src?: string | null } | null> | null, prety_attributes?: Array<{ __typename?: 'PretyAttribute', attribute_type?: string | null, plf_attribute_name?: string | null, options?: Array<{ __typename?: 'PretyAttributeOption', ffm_value?: string | null, plf_value?: string | null, plf_price?: number | null, hex?: string | null, default?: boolean | null } | null> | null } | null> | null, specifics?: Array<{ __typename?: 'ItemSpecific', key?: string | null, value?: string | null, required?: string | null } | null> | null, attribute_specifics?: Array<{ __typename?: 'SpecificAttribute', sale_price?: number | null, base_price?: number | null, fix_profit?: number | null, fixed_profit?: number | null, sku?: string | null, barcode?: string | null, name_value?: Array<{ __typename?: 'NameValueType', name?: string | null, type?: string | null, value?: string | null } | null> | null } | null> | null, attribute_specifics_modify?: Array<{ __typename?: 'SpecificAttribute', sale_price?: number | null, base_price?: number | null, fix_profit?: number | null, fixed_profit?: number | null, sku?: string | null, barcode?: string | null, name_value?: Array<{ __typename?: 'NameValueType', name?: string | null, type?: string | null, value?: string | null } | null> | null } | null> | null, shipping_preset_info?: { __typename?: 'ShippingPreset', dispatch_time_max?: string | null, shipping_time_max?: string | null, location?: string | null, location_detail?: string | null, country?: string | null, shipping_service?: string | null, shipping_cost?: string | null, shipping_additional_cost?: string | null, return_accept?: string | null, global_shipping?: string | null, international_shipping_time_max?: string | null, international_location?: string | null, international_shipping_service?: string | null, international_shipping_cost?: string | null, international_shipping_additional_cost?: string | null, international_return_accept?: string | null, default_quantity?: string | null } | null, platform_category?: Array<{ __typename?: 'PlatformCategory', type?: string | null, category_selected?: Array<{ __typename?: 'PlatformCategorySelected', id?: string | null, level?: string | null, name?: string | null, parent?: string | null } | null> | null } | null> | null, platform_specifics?: Array<{ __typename?: 'PlatformItemSpecific', platform?: string | null, specifics?: Array<{ __typename?: 'ItemSpecific', key?: string | null, value?: string | null, required?: string | null } | null> | null } | null> | null, extend_images?: Array<{ __typename?: 'Image', src?: string | null } | null> | null } | null };

export type InfoQueryVariables = Exact<{ [key: string]: never; }>;


export type InfoQuery = { __typename?: 'RootQuery', info?: { __typename?: 'Info', extension_rule?: { __typename?: 'ExtensionRule', name?: string | null, images?: Array<{ __typename?: 'ExtensionRuleImage', block?: string | null, loop?: string | null, attr?: Array<string | null> | null } | null> | null, id?: Array<{ __typename?: 'ExtensionRuleId', block?: string | null, attr?: string | null } | null> | null, items?: Array<{ __typename?: 'ExtensionRuleItems', block?: string | null, loop?: string | null, url?: string | null, url_attr?: string | null, name?: string | null, name_attr?: string | null, image?: string | null, image_attr?: string | null } | null> | null } | null } | null };

export type ItemsInfoQueryVariables = Exact<{
  identity?: InputMaybe<Scalars['String']>;
  identities?: InputMaybe<Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>>;
}>;


export type ItemsInfoQuery = { __typename?: 'RootQuery', itemsInfo?: Array<{ __typename?: 'ItemInfo', _id?: string | null, identity?: string | null, name?: string | null, description?: string | null, description_ai?: string | null, description_ai_pos?: string | null, front?: string | null, back?: string | null, sleeve?: string | null, hood?: string | null, type?: string | null, plf_price?: number | null, tags?: Array<string | null> | null, collections?: Array<string | null> | null, size_chart?: string | null, fix_profit?: number | null, fixed_profit?: number | null, tax_fee_fix?: number | null, tax_fee?: number | null, include_size_chart?: boolean | null, custom_name?: boolean | null, include_extend_images?: boolean | null, ebay_template_id?: string | null, sku?: string | null, barcode?: string | null, barcode_type?: string | null, price_addition?: number | null, price?: number | null, images?: Array<{ __typename?: 'Image', src?: string | null } | null> | null, prety_attributes?: Array<{ __typename?: 'PretyAttribute', attribute_type?: string | null, plf_attribute_name?: string | null, options?: Array<{ __typename?: 'PretyAttributeOption', ffm_value?: string | null, plf_value?: string | null, plf_price?: number | null, hex?: string | null, default?: boolean | null } | null> | null } | null> | null, specifics?: Array<{ __typename?: 'ItemSpecific', key?: string | null, value?: string | null, required?: string | null } | null> | null, attribute_specifics?: Array<{ __typename?: 'SpecificAttribute', sale_price?: number | null, base_price?: number | null, fix_profit?: number | null, fixed_profit?: number | null, sku?: string | null, barcode?: string | null, name_value?: Array<{ __typename?: 'NameValueType', name?: string | null, type?: string | null, value?: string | null } | null> | null } | null> | null, attribute_specifics_modify?: Array<{ __typename?: 'SpecificAttribute', sale_price?: number | null, base_price?: number | null, fix_profit?: number | null, fixed_profit?: number | null, sku?: string | null, barcode?: string | null, name_value?: Array<{ __typename?: 'NameValueType', name?: string | null, type?: string | null, value?: string | null } | null> | null } | null> | null, shipping_preset_info?: { __typename?: 'ShippingPreset', dispatch_time_max?: string | null, shipping_time_max?: string | null, location?: string | null, location_detail?: string | null, country?: string | null, shipping_service?: string | null, shipping_cost?: string | null, shipping_additional_cost?: string | null, return_accept?: string | null, global_shipping?: string | null, international_shipping_time_max?: string | null, international_location?: string | null, international_shipping_service?: string | null, international_shipping_cost?: string | null, international_shipping_additional_cost?: string | null, international_return_accept?: string | null, default_quantity?: string | null } | null, platform_category?: Array<{ __typename?: 'PlatformCategory', type?: string | null, category_selected?: Array<{ __typename?: 'PlatformCategorySelected', id?: string | null, level?: string | null, name?: string | null, parent?: string | null } | null> | null } | null> | null, platform_specifics?: Array<{ __typename?: 'PlatformItemSpecific', platform?: string | null, specifics?: Array<{ __typename?: 'ItemSpecific', key?: string | null, value?: string | null, required?: string | null } | null> | null } | null> | null, extend_images?: Array<{ __typename?: 'Image', src?: string | null } | null> | null } | null> | null };

export type ProductPresetQueryVariables = Exact<{
  _id?: InputMaybe<Scalars['String']>;
}>;


export type ProductPresetQuery = { __typename?: 'RootQuery', productPreset?: Array<{ __typename?: 'ProductPreset', _id?: string | null, id?: string | null, name?: string | null } | null> | null };

export type CUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CUserQuery = { __typename?: 'RootQuery', cUser?: { __typename?: 'User', _id?: string | null, email?: string | null, name?: string | null, identity?: string | null, identity_label?: string | null, role?: string | null, created_at?: number | null, token?: string | null, auth_docker?: Array<{ __typename?: 'AuthDocker', docker_id?: string | null, docker?: { __typename?: 'Docker', _id?: string | null, domain?: string | null, label?: string | null, server?: string | null, sku?: string | null } | null } | null> | null } | null };

export const DockerFragmentDoc = gql`
    fragment Docker on Docker {
  _id
  domain
  label
  server
  sku
}
    `;
export const AuthDockerFragmentDoc = gql`
    fragment AuthDocker on AuthDocker {
  docker_id
  docker {
    ...Docker
  }
}
    ${DockerFragmentDoc}`;
export const UserFragmentDoc = gql`
    fragment User on User {
  _id
  email
  name
  identity
  identity_label
  role
  created_at
  token
  auth_docker {
    ...AuthDocker
  }
}
    ${AuthDockerFragmentDoc}`;
export const DockerAuthFragmentDoc = gql`
    fragment DockerAuth on DockerAuth {
  auth_id
  user {
    ...User
  }
}
    ${UserFragmentDoc}`;
export const ExtensionRuleImageFragmentDoc = gql`
    fragment ExtensionRuleImage on ExtensionRuleImage {
  block
  loop
  attr
}
    `;
export const ExtensionRuleIdFragmentDoc = gql`
    fragment ExtensionRuleId on ExtensionRuleId {
  block
  attr
}
    `;
export const ExtensionRuleItemsFragmentDoc = gql`
    fragment ExtensionRuleItems on ExtensionRuleItems {
  block
  loop
  url
  url_attr
  name
  name_attr
  image
  image_attr
}
    `;
export const ExtensionRuleFragmentDoc = gql`
    fragment ExtensionRule on ExtensionRule {
  name
  images {
    ...ExtensionRuleImage
  }
  id {
    ...ExtensionRuleId
  }
  items {
    ...ExtensionRuleItems
  }
}
    ${ExtensionRuleImageFragmentDoc}
${ExtensionRuleIdFragmentDoc}
${ExtensionRuleItemsFragmentDoc}`;
export const InfoFragmentDoc = gql`
    fragment Info on Info {
  extension_rule {
    ...ExtensionRule
  }
}
    ${ExtensionRuleFragmentDoc}`;
export const ItemSpecificFragmentDoc = gql`
    fragment ItemSpecific on ItemSpecific {
  key
  value
  required
}
    `;
export const SpecificAttributeFragmentDoc = gql`
    fragment SpecificAttribute on SpecificAttribute {
  sale_price
  base_price
  name_value {
    name
    type
    value
  }
  fix_profit
  fixed_profit
  sku
  barcode
}
    `;
export const ItemInfoFragmentDoc = gql`
    fragment ItemInfo on ItemInfo {
  _id
  identity
  name
  description
  description_ai
  description_ai_pos
  images {
    src
  }
  front
  back
  sleeve
  hood
  type
  plf_price
  prety_attributes {
    attribute_type
    plf_attribute_name
    options {
      ffm_value
      plf_value
      plf_price
      hex
      default
    }
  }
  specifics {
    ...ItemSpecific
  }
  attribute_specifics {
    ...SpecificAttribute
  }
  attribute_specifics_modify {
    ...SpecificAttribute
  }
  tags
  collections
  size_chart
  shipping_preset_info {
    dispatch_time_max
    shipping_time_max
    location
    location_detail
    country
    shipping_service
    shipping_cost
    shipping_additional_cost
    return_accept
    global_shipping
    international_shipping_time_max
    international_location
    international_shipping_service
    international_shipping_cost
    international_shipping_additional_cost
    international_return_accept
    default_quantity
  }
  fix_profit
  fixed_profit
  tax_fee_fix
  tax_fee
  platform_category {
    type
    category_selected {
      id
      level
      name
      parent
    }
  }
  include_size_chart
  custom_name
  include_extend_images
  ebay_template_id
  platform_specifics {
    platform
    specifics {
      ...ItemSpecific
    }
  }
  sku
  barcode
  barcode_type
  extend_images {
    src
  }
  price_addition
  price
}
    ${ItemSpecificFragmentDoc}
${SpecificAttributeFragmentDoc}`;
export const OrderFragmentDoc = gql`
    fragment Order on Order {
  _id
  platform
  platform_id
  identity
  status
}
    `;
export const ProductPresetFragmentDoc = gql`
    fragment ProductPreset on ProductPreset {
  _id
  id
  name
}
    `;
export const PutItemToStoreDocument = gql`
    mutation PutItemToStore($_id: String, $account_id: String, $account_name: String, $account_type: String) {
  putItemToStore(
    _id: $_id
    account_id: $account_id
    account_name: $account_name
    account_type: $account_type
  ) {
    ...ItemInfo
  }
}
    ${ItemInfoFragmentDoc}`;
export type PutItemToStoreMutationFn = Apollo.MutationFunction<PutItemToStoreMutation, PutItemToStoreMutationVariables>;

/**
 * __usePutItemToStoreMutation__
 *
 * To run a mutation, you first call `usePutItemToStoreMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePutItemToStoreMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [putItemToStoreMutation, { data, loading, error }] = usePutItemToStoreMutation({
 *   variables: {
 *      _id: // value for '_id'
 *      account_id: // value for 'account_id'
 *      account_name: // value for 'account_name'
 *      account_type: // value for 'account_type'
 *   },
 * });
 */
export function usePutItemToStoreMutation(baseOptions?: Apollo.MutationHookOptions<PutItemToStoreMutation, PutItemToStoreMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PutItemToStoreMutation, PutItemToStoreMutationVariables>(PutItemToStoreDocument, options);
      }
export type PutItemToStoreMutationHookResult = ReturnType<typeof usePutItemToStoreMutation>;
export type PutItemToStoreMutationResult = Apollo.MutationResult<PutItemToStoreMutation>;
export type PutItemToStoreMutationOptions = Apollo.BaseMutationOptions<PutItemToStoreMutation, PutItemToStoreMutationVariables>;
export const InfoDocument = gql`
    query Info {
  info {
    ...Info
  }
}
    ${InfoFragmentDoc}`;

/**
 * __useInfoQuery__
 *
 * To run a query within a React component, call `useInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInfoQuery({
 *   variables: {
 *   },
 * });
 */
export function useInfoQuery(baseOptions?: Apollo.QueryHookOptions<InfoQuery, InfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<InfoQuery, InfoQueryVariables>(InfoDocument, options);
      }
export function useInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<InfoQuery, InfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<InfoQuery, InfoQueryVariables>(InfoDocument, options);
        }
export type InfoQueryHookResult = ReturnType<typeof useInfoQuery>;
export type InfoLazyQueryHookResult = ReturnType<typeof useInfoLazyQuery>;
export type InfoQueryResult = Apollo.QueryResult<InfoQuery, InfoQueryVariables>;
export const ItemsInfoDocument = gql`
    query ItemsInfo($identity: String, $identities: [String]) {
  itemsInfo(identity: $identity, identities: $identities) {
    ...ItemInfo
  }
}
    ${ItemInfoFragmentDoc}`;

/**
 * __useItemsInfoQuery__
 *
 * To run a query within a React component, call `useItemsInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useItemsInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useItemsInfoQuery({
 *   variables: {
 *      identity: // value for 'identity'
 *      identities: // value for 'identities'
 *   },
 * });
 */
export function useItemsInfoQuery(baseOptions?: Apollo.QueryHookOptions<ItemsInfoQuery, ItemsInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ItemsInfoQuery, ItemsInfoQueryVariables>(ItemsInfoDocument, options);
      }
export function useItemsInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ItemsInfoQuery, ItemsInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ItemsInfoQuery, ItemsInfoQueryVariables>(ItemsInfoDocument, options);
        }
export type ItemsInfoQueryHookResult = ReturnType<typeof useItemsInfoQuery>;
export type ItemsInfoLazyQueryHookResult = ReturnType<typeof useItemsInfoLazyQuery>;
export type ItemsInfoQueryResult = Apollo.QueryResult<ItemsInfoQuery, ItemsInfoQueryVariables>;
export const ProductPresetDocument = gql`
    query productPreset($_id: String) {
  productPreset(_id: $_id) {
    ...ProductPreset
  }
}
    ${ProductPresetFragmentDoc}`;

/**
 * __useProductPresetQuery__
 *
 * To run a query within a React component, call `useProductPresetQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductPresetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductPresetQuery({
 *   variables: {
 *      _id: // value for '_id'
 *   },
 * });
 */
export function useProductPresetQuery(baseOptions?: Apollo.QueryHookOptions<ProductPresetQuery, ProductPresetQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProductPresetQuery, ProductPresetQueryVariables>(ProductPresetDocument, options);
      }
export function useProductPresetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductPresetQuery, ProductPresetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProductPresetQuery, ProductPresetQueryVariables>(ProductPresetDocument, options);
        }
export type ProductPresetQueryHookResult = ReturnType<typeof useProductPresetQuery>;
export type ProductPresetLazyQueryHookResult = ReturnType<typeof useProductPresetLazyQuery>;
export type ProductPresetQueryResult = Apollo.QueryResult<ProductPresetQuery, ProductPresetQueryVariables>;
export const CUserDocument = gql`
    query CUser {
  cUser {
    ...User
  }
}
    ${UserFragmentDoc}`;

/**
 * __useCUserQuery__
 *
 * To run a query within a React component, call `useCUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useCUserQuery(baseOptions?: Apollo.QueryHookOptions<CUserQuery, CUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CUserQuery, CUserQueryVariables>(CUserDocument, options);
      }
export function useCUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CUserQuery, CUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CUserQuery, CUserQueryVariables>(CUserDocument, options);
        }
export type CUserQueryHookResult = ReturnType<typeof useCUserQuery>;
export type CUserLazyQueryHookResult = ReturnType<typeof useCUserLazyQuery>;
export type CUserQueryResult = Apollo.QueryResult<CUserQuery, CUserQueryVariables>;