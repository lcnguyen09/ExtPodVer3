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

export type AuthDocker = {
  __typename?: 'AuthDocker';
  auth_id?: Maybe<Scalars['String']>;
  author?: Maybe<Scalars['Boolean']>;
  docker?: Maybe<Docker>;
  docker_id?: Maybe<Scalars['String']>;
  groups?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export enum AutoStatus {
  Auto = 'Auto',
  Manual = 'Manual'
}

export enum CacheControlScope {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

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

export type ExtensionRule = {
  __typename?: 'ExtensionRule';
  images?: Maybe<Array<Maybe<ExtensionRuleImage>>>;
  name?: Maybe<Scalars['String']>;
};

export type ExtensionRuleImage = {
  __typename?: 'ExtensionRuleImage';
  block?: Maybe<Scalars['String']>;
  extra_attr?: Maybe<Scalars['String']>;
  loop?: Maybe<Scalars['String']>;
  main_attr?: Maybe<Scalars['String']>;
};

export type Fulfilment = {
  __typename?: 'Fulfilment';
  _id?: Maybe<Scalars['String']>;
  balance?: Maybe<Scalars['Float']>;
  created_at?: Maybe<Scalars['Int']>;
  customcat_config?: Maybe<Customcat>;
  default?: Maybe<Scalars['Boolean']>;
  dreamship_config?: Maybe<Dreamship>;
  geargag_config?: Maybe<Geargag>;
  gearment_config?: Maybe<Gearment>;
  geekpod_config?: Maybe<Geekpod>;
  merchize_config?: Maybe<Merchize>;
  name?: Maybe<Scalars['String']>;
  onos_config?: Maybe<Onos>;
  printify_config?: Maybe<Printify>;
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
  merchize_config?: InputMaybe<MerchizeInput>;
  onos_config?: InputMaybe<OnosInput>;
  printify_config?: InputMaybe<PrintifyInput>;
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

export type Info = {
  __typename?: 'Info';
  account_plan_config?: Maybe<Scalars['String']>;
  extension_rule?: Maybe<ExtensionRule>;
  hub_plan_config?: Maybe<Scalars['String']>;
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
  job?: Maybe<Job>;
  job_type?: Maybe<Scalars['String']>;
};

export type JobsList = {
  __typename?: 'JobsList';
  _id?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['Int']>;
  data?: Maybe<Scalars['String']>;
  job_type?: Maybe<Scalars['String']>;
  msg?: Maybe<Array<Maybe<Msg>>>;
  pending?: Maybe<Scalars['String']>;
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

export enum Method {
  Add = 'ADD',
  Delete = 'DELETE',
  Root = 'ROOT',
  Update = 'UPDATE',
  View = 'VIEW'
}

export type Msg = {
  __typename?: 'Msg';
  code?: Maybe<Scalars['String']>;
  msg?: Maybe<Scalars['String']>;
};

export type Onos = {
  __typename?: 'Onos';
  key?: Maybe<Scalars['String']>;
};

/** input for create or update */
export type OnosInput = {
  key: Scalars['String'];
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

export type PlanLog = {
  __typename?: 'PlanLog';
  expires_at?: Maybe<Scalars['Int']>;
  payment_at?: Maybe<Scalars['Int']>;
  plan?: Maybe<Scalars['String']>;
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

export type Private = {
  __typename?: 'Private';
  key?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

/** input for create or update */
export type PrivateInput = {
  key: Scalars['String'];
  url: Scalars['String'];
};

export type RandomId = {
  __typename?: 'RandomID';
  key?: Maybe<Scalars['String']>;
};

export type ResponseCheckUserAccess = {
  __typename?: 'ResponseCheckUserAccess';
  allowed?: Maybe<Scalars['Boolean']>;
};

export type ResultTopup = {
  __typename?: 'ResultTopup';
  message?: Maybe<Scalars['String']>;
  result?: Maybe<Scalars['Boolean']>;
  transaction_id?: Maybe<Scalars['String']>;
};

export enum Role {
  Accounting = 'accounting',
  Auth = 'auth',
  Cutting = 'cutting',
  OrderQc = 'order_qc',
  Packager = 'packager',
  Printer = 'printer',
  Qc = 'qc',
  Root = 'root',
  Sale = 'sale',
  Sewer = 'sewer',
  SuperRoot = 'super_root',
  Supporter = 'supporter'
}

export type RootMutation = {
  __typename?: 'RootMutation';
  createUser?: Maybe<User>;
  deleteById?: Maybe<User>;
  deleteCouponById?: Maybe<Coupon>;
  /** Docker maker */
  dockerMake?: Maybe<Docker>;
  dockerTrash?: Maybe<Array<Maybe<Docker>>>;
  jobsRemove?: Maybe<Msg>;
  jobsStart?: Maybe<Array<Maybe<Jobs>>>;
  jobsStop?: Maybe<Array<Maybe<Jobs>>>;
  login?: Maybe<Scalars['String']>;
  makeCoupon?: Maybe<Coupon>;
  /** Fulfilment maker */
  makeFulfilment?: Maybe<Array<Maybe<Fulfilment>>>;
  /** Until */
  makeRandomID?: Maybe<RandomId>;
  makeTransaction?: Maybe<Transaction>;
  makeUser?: Maybe<Array<Maybe<User>>>;
  makeUserGroup?: Maybe<Array<Maybe<UserGroup>>>;
  makeUserGroups?: Maybe<Array<Maybe<UserGroup>>>;
  sendVerifyCode?: Maybe<User>;
  sendVerifyCodeResetPassword?: Maybe<User>;
  storageMake?: Maybe<Storage>;
  topupAccount?: Maybe<Transaction>;
  trashFulfilment?: Maybe<Array<Maybe<Fulfilment>>>;
  trashUserGroup?: Maybe<Array<Maybe<UserGroup>>>;
  /** User editer */
  updateProfile?: Maybe<User>;
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


export type RootMutationDeleteCouponByIdArgs = {
  _id?: InputMaybe<Scalars['String']>;
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
  unlimit_lifetime?: InputMaybe<Scalars['Boolean']>;
  users?: InputMaybe<DockerUserInput>;
};


export type RootMutationDockerTrashArgs = {
  id?: InputMaybe<Scalars['String']>;
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


export type RootMutationMakeCouponArgs = {
  code?: InputMaybe<Scalars['String']>;
  fixed_value?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['Float']>;
};


export type RootMutationMakeFulfilmentArgs = {
  auto?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  params?: InputMaybe<FulfilmentInput>;
  status?: InputMaybe<Scalars['String']>;
};


export type RootMutationMakeRandomIdArgs = {
  prefix?: InputMaybe<Scalars['String']>;
};


export type RootMutationMakeTransactionArgs = {
  id?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
};


export type RootMutationMakeUserArgs = {
  hubs?: InputMaybe<UserHubInput>;
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


export type RootMutationSendVerifyCodeResetPasswordArgs = {
  email?: InputMaybe<Scalars['String']>;
};


export type RootMutationStorageMakeArgs = {
  access_key?: InputMaybe<Scalars['String']>;
  access_key_id?: InputMaybe<Scalars['String']>;
  bucket?: InputMaybe<Scalars['String']>;
  region?: InputMaybe<Scalars['String']>;
};


export type RootMutationTopupAccountArgs = {
  amount?: InputMaybe<Scalars['Float']>;
  message?: InputMaybe<Scalars['String']>;
  payment_method?: InputMaybe<Scalars['String']>;
  payment_transaction_info?: InputMaybe<Scalars['String']>;
  user?: InputMaybe<Scalars['String']>;
};


export type RootMutationTrashFulfilmentArgs = {
  ids: Array<InputMaybe<Scalars['String']>>;
};


export type RootMutationTrashUserGroupArgs = {
  delete_ids?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type RootMutationUpdateProfileArgs = {
  annually?: InputMaybe<Scalars['Boolean']>;
  customizer?: InputMaybe<CustomizerInput>;
  facebook?: InputMaybe<Scalars['String']>;
  h?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  new_password?: InputMaybe<Scalars['String']>;
  onos_email?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  phone_number?: InputMaybe<Scalars['String']>;
  plan?: InputMaybe<Scalars['String']>;
  sale_plan?: InputMaybe<Scalars['String']>;
  sku?: InputMaybe<Scalars['String']>;
  sku_label?: InputMaybe<Scalars['String']>;
  skype?: InputMaybe<Scalars['String']>;
  verify_code?: InputMaybe<Scalars['String']>;
  verify_code_reset_password?: InputMaybe<Scalars['String']>;
};

export type RootQuery = {
  __typename?: 'RootQuery';
  cUser?: Maybe<User>;
  checkUserAccess?: Maybe<ResponseCheckUserAccess>;
  coupons?: Maybe<Array<Maybe<Coupon>>>;
  /** Docker */
  dockers?: Maybe<Array<Maybe<Docker>>>;
  /** Fulfilment */
  fulfilments?: Maybe<Array<Maybe<Fulfilment>>>;
  getDefaultPermissions?: Maybe<Array<Maybe<Permission>>>;
  getUserByEmail?: Maybe<User>;
  getUserById?: Maybe<User>;
  info?: Maybe<Info>;
  jobGroups?: Maybe<Array<Maybe<Jobs>>>;
  jobs?: Maybe<Array<Maybe<Jobs>>>;
  jobslist?: Maybe<Array<Maybe<JobsList>>>;
  serverList?: Maybe<Array<Maybe<ServerList>>>;
  storage?: Maybe<Storage>;
  transactions?: Maybe<Array<Maybe<Transaction>>>;
  userPermissions?: Maybe<Array<Maybe<Permission>>>;
  usergroups?: Maybe<Array<Maybe<UserGroup>>>;
  users?: Maybe<Array<Maybe<User>>>;
  usersByName?: Maybe<Array<Maybe<User>>>;
};


export type RootQueryCheckUserAccessArgs = {
  action: Scalars['String'];
  method: Scalars['String'];
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


export type RootQueryDockersArgs = {
  end?: InputMaybe<Scalars['String']>;
  invite_id?: InputMaybe<Scalars['String']>;
  search?: InputMaybe<Scalars['String']>;
  server?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};


export type RootQueryFulfilmentsArgs = {
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  private?: InputMaybe<Scalars['Boolean']>;
  status?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  types?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type RootQueryGetUserByEmailArgs = {
  email?: InputMaybe<Scalars['String']>;
};


export type RootQueryGetUserByIdArgs = {
  _id?: InputMaybe<Scalars['String']>;
};


export type RootQueryJobslistArgs = {
  created_at?: InputMaybe<Scalars['Int']>;
  fulfilment_id?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  store_id?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};


export type RootQueryTransactionsArgs = {
  account?: InputMaybe<Scalars['String']>;
  amount?: InputMaybe<Scalars['String']>;
  end?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  referent?: InputMaybe<Scalars['String']>;
  search?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};


export type RootQueryUsergroupsArgs = {
  get_all?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
};


export type RootQueryUsersArgs = {
  docker_id?: InputMaybe<Scalars['String']>;
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

export type RootSubscription = {
  __typename?: 'RootSubscription';
  info?: Maybe<Scalars['String']>;
};

export type Scalable = {
  __typename?: 'Scalable';
  key?: Maybe<Scalars['String']>;
};

/** input for create or update */
export type ScalableInput = {
  key: Scalars['String'];
};

export type ServerList = {
  __typename?: 'ServerList';
  _id?: Maybe<Scalars['String']>;
  default?: Maybe<Scalars['Boolean']>;
  domain?: Maybe<Scalars['String']>;
  ip?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
  port?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
};

export type Shineon = {
  __typename?: 'Shineon';
  key?: Maybe<Scalars['String']>;
};

/** input for create or update */
export type ShineonInput = {
  key: Scalars['String'];
};

export enum Status {
  Invalid = 'Invalid',
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

export type Transaction = {
  __typename?: 'Transaction';
  _id?: Maybe<Scalars['String']>;
  account_id?: Maybe<Scalars['String']>;
  amount?: Maybe<Scalars['Float']>;
  balance?: Maybe<Scalars['Float']>;
  created_at?: Maybe<Scalars['Int']>;
  fee?: Maybe<Scalars['Float']>;
  invoice_id?: Maybe<Scalars['String']>;
  invoice_identity?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  message_code?: Maybe<Scalars['String']>;
  payment_method?: Maybe<Scalars['String']>;
  payment_status?: Maybe<Scalars['String']>;
  payment_transaction_info?: Maybe<Scalars['String']>;
  referent?: Maybe<Scalars['String']>;
  referent_id?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  sub_message?: Maybe<Scalars['String']>;
  sub_referent_id?: Maybe<Scalars['String']>;
  transaction_id?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type User = {
  __typename?: 'User';
  _id?: Maybe<Scalars['String']>;
  annually?: Maybe<Scalars['Boolean']>;
  auth_docker?: Maybe<Array<Maybe<AuthDocker>>>;
  created_at?: Maybe<Scalars['Int']>;
  created_by_user_id?: Maybe<Scalars['String']>;
  customizer?: Maybe<Customizer>;
  email?: Maybe<Scalars['String']>;
  facebook?: Maybe<Scalars['String']>;
  ffm_sku?: Maybe<Scalars['String']>;
  ffm_sku_label?: Maybe<Scalars['String']>;
  group?: Maybe<UserGroupInfo>;
  groups?: Maybe<Array<Maybe<Scalars['String']>>>;
  h?: Maybe<Scalars['String']>;
  hubs?: Maybe<Array<Maybe<UserHub>>>;
  identity?: Maybe<Scalars['String']>;
  identity_label?: Maybe<Scalars['String']>;
  is_default?: Maybe<Scalars['Int']>;
  last_login?: Maybe<Scalars['Int']>;
  max_hub?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  onos_email?: Maybe<Scalars['String']>;
  permission?: Maybe<Array<Maybe<Permission>>>;
  phone_number?: Maybe<Scalars['String']>;
  plan?: Maybe<Scalars['String']>;
  plan_log?: Maybe<PlanLog>;
  /**
   * user_type: String
   * active_status: String
   */
  product_preset_favorites?: Maybe<Array<Maybe<Scalars['String']>>>;
  role?: Maybe<Scalars['String']>;
  sale_plan?: Maybe<Scalars['String']>;
  ship_by_seller?: Maybe<Scalars['Boolean']>;
  sku?: Maybe<Scalars['String']>;
  sku_label?: Maybe<Scalars['String']>;
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

export type UserHub = {
  __typename?: 'UserHub';
  hub_action?: Maybe<Scalars['String']>;
  hub_domain?: Maybe<Scalars['String']>;
  hub_domain_name?: Maybe<Scalars['String']>;
  hub_id?: Maybe<Scalars['String']>;
  hub_name?: Maybe<Scalars['String']>;
};

export type UserHubInput = {
  hub_action?: InputMaybe<Scalars['String']>;
  hub_domain_name?: InputMaybe<Scalars['String']>;
  hub_groups?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  hub_id?: InputMaybe<Scalars['String']>;
  hub_label?: InputMaybe<Scalars['String']>;
  hub_server?: InputMaybe<Scalars['String']>;
};

export type UserInput = {
  confirm_password?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  facebook?: InputMaybe<Scalars['String']>;
  groups?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  id?: InputMaybe<Scalars['String']>;
  identity_label?: InputMaybe<Scalars['String']>;
  max_hub?: InputMaybe<Scalars['Int']>;
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

export type DockerFragment = { __typename?: 'Docker', _id?: string | null, domain?: string | null, label?: string | null, server?: string | null, sku?: string | null };

export type DockerAuthFragment = { __typename?: 'DockerAuth', auth_id?: string | null, user?: { __typename?: 'User', _id?: string | null, email?: string | null, name?: string | null, identity?: string | null, identity_label?: string | null, role?: string | null, created_at?: number | null, token?: string | null, auth_docker?: Array<{ __typename?: 'AuthDocker', docker_id?: string | null, docker?: { __typename?: 'Docker', _id?: string | null, domain?: string | null, label?: string | null, server?: string | null, sku?: string | null } | null } | null> | null } | null };

export type InfoFragment = { __typename?: 'Info', extension_rule?: { __typename?: 'ExtensionRule', name?: string | null, images?: Array<{ __typename?: 'ExtensionRuleImage', block?: string | null, loop?: string | null, main_attr?: string | null, extra_attr?: string | null } | null> | null } | null };

export type ExtensionRuleFragment = { __typename?: 'ExtensionRule', name?: string | null, images?: Array<{ __typename?: 'ExtensionRuleImage', block?: string | null, loop?: string | null, main_attr?: string | null, extra_attr?: string | null } | null> | null };

export type ExtensionRuleImageFragment = { __typename?: 'ExtensionRuleImage', block?: string | null, loop?: string | null, main_attr?: string | null, extra_attr?: string | null };

export type UserFragment = { __typename?: 'User', _id?: string | null, email?: string | null, name?: string | null, identity?: string | null, identity_label?: string | null, role?: string | null, created_at?: number | null, token?: string | null, auth_docker?: Array<{ __typename?: 'AuthDocker', docker_id?: string | null, docker?: { __typename?: 'Docker', _id?: string | null, domain?: string | null, label?: string | null, server?: string | null, sku?: string | null } | null } | null> | null };

export type AuthDockerFragment = { __typename?: 'AuthDocker', docker_id?: string | null, docker?: { __typename?: 'Docker', _id?: string | null, domain?: string | null, label?: string | null, server?: string | null, sku?: string | null } | null };

export type InfoQueryVariables = Exact<{ [key: string]: never; }>;


export type InfoQuery = { __typename?: 'RootQuery', info?: { __typename?: 'Info', extension_rule?: { __typename?: 'ExtensionRule', name?: string | null, images?: Array<{ __typename?: 'ExtensionRuleImage', block?: string | null, loop?: string | null, main_attr?: string | null, extra_attr?: string | null } | null> | null } | null } | null };

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
  main_attr
  extra_attr
}
    `;
export const ExtensionRuleFragmentDoc = gql`
    fragment ExtensionRule on ExtensionRule {
  name
  images {
    ...ExtensionRuleImage
  }
}
    ${ExtensionRuleImageFragmentDoc}`;
export const InfoFragmentDoc = gql`
    fragment Info on Info {
  extension_rule {
    ...ExtensionRule
  }
}
    ${ExtensionRuleFragmentDoc}`;
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