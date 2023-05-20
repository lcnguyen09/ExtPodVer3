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
  Any: any;
  Date: any;
  Email: any;
  Map: any;
  Password: any;
  Time: any;
  Upload: any;
};

export type Auth = {
  __typename?: 'Auth';
  _id: Scalars['ID'];
  created_at: Scalars['Date'];
  email: Scalars['String'];
  first_name: Scalars['String'];
  last_name: Scalars['String'];
  permissions?: Maybe<Array<Permission>>;
  role: Scalars['String'];
  token?: Maybe<AuthToken>;
  updated_at?: Maybe<Scalars['Date']>;
};

export type AuthToken = {
  __typename?: 'AuthToken';
  access_token: Scalars['String'];
  expired_at: Scalars['Date'];
  refresh_token: Scalars['String'];
  token_type: Scalars['String'];
};

export type Board = {
  __typename?: 'Board';
  _id: Scalars['String'];
  board_index: Scalars['Int'];
  created_at: Scalars['Date'];
  is_default: Scalars['Boolean'];
  name: Scalars['String'];
  tasks?: Maybe<Array<Task>>;
  user_id: Scalars['String'];
};

export type BoardMutationResponse = {
  __typename?: 'BoardMutationResponse';
  board?: Maybe<Board>;
  errorFields?: Maybe<Array<ErrorField>>;
  message: Scalars['String'];
};

export type ClipArt = {
  __typename?: 'ClipArt';
  _id: Scalars['ID'];
  category_id: Scalars['ID'];
  children?: Maybe<Array<ClipArtElement>>;
  metadata?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  options?: Maybe<Array<SettingNameValue>>;
  properties?: Maybe<Array<ClipArtProperty>>;
  shop_id?: Maybe<Scalars['Int']>;
  signed_url?: Maybe<Scalars['String']>;
  src: Scalars['String'];
  tagName?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  user_id: Scalars['ID'];
};

export type ClipArtCategory = {
  __typename?: 'ClipArtCategory';
  _id: Scalars['ID'];
  created_at: Scalars['Date'];
  deleted_at?: Maybe<Scalars['Date']>;
  name: Scalars['String'];
  thumb?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['Date']>;
};

export type ClipArtCategoryMutateResponse = {
  __typename?: 'ClipArtCategoryMutateResponse';
  clipArtCategory: ClipArtCategory;
  errors?: Maybe<Array<ErrorField>>;
  message?: Maybe<Scalars['String']>;
};

export type ClipArtCategoryPaginate = {
  __typename?: 'ClipArtCategoryPaginate';
  items?: Maybe<Array<ClipArtCategory>>;
  paginate?: Maybe<Paginate>;
};

export type ClipArtElement = {
  __typename?: 'ClipArtElement';
  children?: Maybe<Array<ClipArtElement>>;
  metadata?: Maybe<Scalars['String']>;
  properties?: Maybe<Array<ClipArtProperty>>;
  tagName?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type ClipArtMutateResponse = {
  __typename?: 'ClipArtMutateResponse';
  clipArt: ClipArt;
  errors?: Maybe<Array<ErrorField>>;
  message?: Maybe<Scalars['String']>;
};

export type ClipArtPaginate = {
  __typename?: 'ClipArtPaginate';
  items?: Maybe<Array<ClipArt>>;
  paginate?: Maybe<Paginate>;
};

export type ClipArtProperty = {
  __typename?: 'ClipArtProperty';
  name?: Maybe<Scalars['String']>;
  option_name?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type Collection = {
  __typename?: 'Collection';
  _id: Scalars['ID'];
  name: Scalars['String'];
};

export type Comment = {
  __typename?: 'Comment';
  _id: Scalars['ID'];
  comment_at: Scalars['Date'];
  is_system: Scalars['Boolean'];
  meta?: Maybe<Array<CommentMeta>>;
  referent_id: Scalars['ID'];
  referent_type?: Maybe<Scalars['String']>;
  text: Scalars['String'];
  user: User;
  user_id: Scalars['ID'];
};

export type CommentMeta = {
  __typename?: 'CommentMeta';
  file?: Maybe<File>;
  product?: Maybe<Product>;
  reference?: Maybe<Task>;
  user?: Maybe<User>;
};

export type CommentPaginate = {
  __typename?: 'CommentPaginate';
  items?: Maybe<Array<Comment>>;
  paginate: Paginate;
};

export enum CommentType {
  Task = 'TASK',
  Workspace = 'WORKSPACE'
}

export type CurrentIp = {
  __typename?: 'CurrentIP';
  description: Scalars['String'];
  ip: Scalars['String'];
};

export type DashboardSummary = {
  __typename?: 'DashboardSummary';
  total_assign_me: Scalars['Int'];
  total_completed_task: Scalars['Int'];
  total_created_me: Scalars['Int'];
  total_tasks: Scalars['Int'];
};

export type ErrorField = {
  __typename?: 'ErrorField';
  message: Scalars['String'];
  name: Scalars['String'];
};

export type File = {
  __typename?: 'File';
  _id: Scalars['String'];
  created_at: Scalars['Date'];
  filesize: Scalars['Float'];
  height?: Maybe<Scalars['Float']>;
  mimetype: Scalars['String'];
  name: Scalars['String'];
  sizes?: Maybe<Array<FileSize>>;
  src: Scalars['String'];
  upload_id?: Maybe<Scalars['String']>;
  user: User;
  user_id: Scalars['String'];
  width?: Maybe<Scalars['Float']>;
};

export type FileMutationResponse = {
  __typename?: 'FileMutationResponse';
  file?: Maybe<File>;
  message?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type FilePaginate = {
  __typename?: 'FilePaginate';
  items?: Maybe<Array<File>>;
  paginate: Paginate;
};

export type FileSize = {
  __typename?: 'FileSize';
  height: Scalars['Float'];
  src: Scalars['String'];
  width: Scalars['Float'];
};

export type Ip = {
  __typename?: 'IP';
  _id: Scalars['ID'];
  description: Scalars['String'];
  ip: Scalars['String'];
  organization?: Maybe<OrganizationShortcut>;
  organization_id: Scalars['ID'];
};

export type IpMutationResponse = {
  __typename?: 'IPMutationResponse';
  message?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type InputBoard = {
  _id: Scalars['String'];
  name: Scalars['String'];
  workspace_id?: InputMaybe<Scalars['String']>;
};

export type InputComment = {
  _id?: InputMaybe<Scalars['ID']>;
  referent_id: Scalars['ID'];
  referent_type?: InputMaybe<CommentType>;
  text: Scalars['String'];
};

export type InputFile = {
  _id?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['Date']>;
  filesize?: InputMaybe<Scalars['Float']>;
  height?: InputMaybe<Scalars['String']>;
  mimetype?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  sizes?: InputMaybe<Array<InputMaybe<InputFileSize>>>;
  src?: InputMaybe<Scalars['String']>;
  user_id?: InputMaybe<Scalars['String']>;
  width?: InputMaybe<Scalars['String']>;
};

export type InputFileSize = {
  height?: InputMaybe<Scalars['Float']>;
  src?: InputMaybe<Scalars['String']>;
  width?: InputMaybe<Scalars['Float']>;
};

export type InputIp = {
  _id: Scalars['ID'];
  description: Scalars['String'];
  ip: Scalars['String'];
  organization_id: Scalars['ID'];
};

export type InputInvite = {
  email: Scalars['String'];
  workspaces: Array<Scalars['String']>;
};

export type InputMockup = {
  _id: Scalars['ID'];
  collection_id: Scalars['ID'];
  images?: InputMaybe<Array<InputMockupImage>>;
  mockup_id: Scalars['String'];
};

export type InputMockupImage = {
  _id: Scalars['ID'];
  image?: InputMaybe<InputFile>;
  prints?: InputMaybe<Array<InputMockupPrint>>;
};

export type InputMockupLayer = {
  _id: Scalars['ID'];
  layers?: InputMaybe<Array<InputMockupLayer>>;
  name: Scalars['String'];
  settings?: InputMaybe<Array<InputSettingNameValue>>;
  type: Scalars['String'];
};

export type InputMockupPaginate = {
  collection_id: Scalars['ID'];
  page: Scalars['Int'];
  perpage: Scalars['Int'];
  product_id: Scalars['ID'];
  search: Scalars['String'];
};

export type InputMockupPrint = {
  _id: Scalars['ID'];
  height: Scalars['Float'];
  layers?: InputMaybe<Array<InputMockupLayer>>;
  print_id: Scalars['String'];
  rotation: Scalars['Float'];
  scale_x: Scalars['Float'];
  scale_y: Scalars['Float'];
  skew_x: Scalars['Float'];
  skew_y: Scalars['Float'];
  width: Scalars['Float'];
  x: Scalars['Float'];
  y: Scalars['Float'];
};

export type InputOrganization = {
  _id: Scalars['ID'];
  description: Scalars['String'];
  name: Scalars['String'];
  telegram?: InputMaybe<InputOrganizationTelegram>;
};

export type InputOrganizationTelegram = {
  actions?: InputMaybe<Array<InputTelegramAction>>;
  active?: InputMaybe<Scalars['Boolean']>;
  group?: InputMaybe<InputTelegramChat>;
};

export type InputPermission = {
  accept: Scalars['Boolean'];
  id: Scalars['String'];
  name: Scalars['String'];
};

export type InputSettingNameValue = {
  name: Scalars['String'];
  value: Scalars['String'];
};

export type InputSiteConfig = {
  logo?: InputMaybe<InputFile>;
  logo_height?: InputMaybe<Scalars['Float']>;
  logo_width?: InputMaybe<Scalars['Float']>;
};

export type InputTag = {
  _id?: InputMaybe<Scalars['ID']>;
  color?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};

export type InputTask = {
  _id: Scalars['String'];
  actual_duration_type?: InputMaybe<Scalars['String']>;
  actual_duration_unit?: InputMaybe<Scalars['Int']>;
  actual_started_at?: InputMaybe<Scalars['Date']>;
  assign_id: Scalars['String'];
  board_id?: InputMaybe<Scalars['String']>;
  collections?: InputMaybe<Array<InputTaskCollection>>;
  description: Scalars['String'];
  duration_time?: InputMaybe<Scalars['Int']>;
  expect_duration_type?: InputMaybe<Scalars['String']>;
  expect_duration_unit?: InputMaybe<Scalars['Int']>;
  expect_started_at?: InputMaybe<Scalars['Date']>;
  expired_at?: InputMaybe<Scalars['Date']>;
  is_completed: Scalars['Boolean'];
  name: Scalars['String'];
  parent_id: Scalars['String'];
  personalization?: InputMaybe<Scalars['Boolean']>;
  product_id: Scalars['String'];
  psd_files?: InputMaybe<Array<InputFile>>;
  reference_id: Scalars['String'];
  request_files?: InputMaybe<Array<InputFile>>;
  resource_meta?: InputMaybe<Array<InputTaskResource>>;
  response_files?: InputMaybe<Array<InputFile>>;
  tags?: InputMaybe<Array<InputTaskTag>>;
  tasks?: InputMaybe<Array<InputTask>>;
};

export type InputTaskCollection = {
  _id?: InputMaybe<Scalars['String']>;
  is_new?: InputMaybe<Scalars['Boolean']>;
  name: Scalars['String'];
};

export type InputTaskResource = {
  name: Scalars['String'];
  unique: Scalars['Boolean'];
  value: Scalars['String'];
};

export type InputTaskTag = {
  _id?: InputMaybe<Scalars['String']>;
  color: Scalars['String'];
  is_new?: InputMaybe<Scalars['Boolean']>;
  name: Scalars['String'];
};

export type InputTelegramAction = {
  action: Scalars['String'];
  active: Scalars['Boolean'];
  groups?: InputMaybe<Array<InputTelegramChat>>;
};

export type InputTelegramAuthorize = {
  auth_date: Scalars['Int'];
  first_name: Scalars['String'];
  hash: Scalars['String'];
  id: Scalars['Int'];
  last_name?: InputMaybe<Scalars['String']>;
  photo_url?: InputMaybe<Scalars['String']>;
  username: Scalars['String'];
};

export type InputTelegramChat = {
  _id: Scalars['ID'];
  chat_id: Scalars['Int'];
  first_name: Scalars['String'];
  last_name: Scalars['String'];
  title: Scalars['String'];
  type: Scalars['String'];
  username: Scalars['String'];
};

export type InputUser = {
  _id: Scalars['String'];
  bonus_per_hour?: InputMaybe<Scalars['Float']>;
  confirm_password?: InputMaybe<Scalars['Password']>;
  email?: InputMaybe<Scalars['Email']>;
  first_name?: InputMaybe<Scalars['String']>;
  last_name?: InputMaybe<Scalars['String']>;
  organization_id: Scalars['ID'];
  password?: InputMaybe<Scalars['Password']>;
  permissions?: InputMaybe<Array<InputPermission>>;
  role?: InputMaybe<Role>;
  status?: InputMaybe<UserStatus>;
  working_hours_per_month?: InputMaybe<Scalars['Float']>;
};

export type InputWorkspace = {
  _id?: InputMaybe<Scalars['String']>;
  color?: InputMaybe<Scalars['String']>;
  default_assignee?: InputMaybe<InputWorkspaceMember>;
  is_archived?: InputMaybe<Scalars['Boolean']>;
  members?: InputMaybe<Array<InputMaybe<InputWorkspaceMember>>>;
  name?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<WorkspaceType>;
};

export type InputWorkspaceMember = {
  _id?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  first_name?: InputMaybe<Scalars['String']>;
  last_name?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<Scalars['String']>;
};

export type InviteWorkspaceResponse = {
  __typename?: 'InviteWorkspaceResponse';
  message: Scalars['String'];
  success: Scalars['Boolean'];
};

export type KpiSummary = {
  __typename?: 'KpiSummary';
  total_actual_time: Scalars['Int'];
  total_completed: Scalars['Int'];
  total_estimate_time: Scalars['Int'];
  total_tasks: Scalars['Int'];
};

export enum LayerType {
  Clipart = 'CLIPART',
  Image = 'IMAGE',
  Printarea = 'PRINTAREA',
  Text = 'Text'
}

export type Mockup = {
  __typename?: 'Mockup';
  _id: Scalars['ID'];
  collection_id: Scalars['ID'];
  created_at: Scalars['Date'];
  deleted_at?: Maybe<Scalars['Date']>;
  height: Scalars['Float'];
  images?: Maybe<Array<MockupImage>>;
  mockup_id: Scalars['String'];
  name: Scalars['String'];
  product: Product;
  product_id: Scalars['ID'];
  updated_at?: Maybe<Scalars['Date']>;
  user: User;
  user_id: Scalars['ID'];
  width: Scalars['Float'];
};

export type MockupImage = {
  __typename?: 'MockupImage';
  _id: Scalars['ID'];
  height: Scalars['Float'];
  image?: Maybe<File>;
  prints?: Maybe<Array<MockupPrint>>;
  width: Scalars['Float'];
};

export type MockupLayer = {
  __typename?: 'MockupLayer';
  _id: Scalars['ID'];
  layers?: Maybe<Array<MockupLayer>>;
  name: Scalars['String'];
  settings?: Maybe<Array<SettingNameValue>>;
  type: Scalars['String'];
};

export type MockupMutation = {
  __typename?: 'MockupMutation';
  errors?: Maybe<Array<Maybe<ErrorField>>>;
  mockup?: Maybe<Mockup>;
  success?: Maybe<Scalars['Boolean']>;
};

export type MockupPaginate = {
  __typename?: 'MockupPaginate';
  items?: Maybe<Array<Mockup>>;
  paginate?: Maybe<Paginate>;
};

export type MockupPrint = {
  __typename?: 'MockupPrint';
  _id: Scalars['ID'];
  height: Scalars['Float'];
  layers?: Maybe<Array<MockupLayer>>;
  print_id: Scalars['String'];
  rotation: Scalars['Float'];
  scale_x: Scalars['Float'];
  scale_y: Scalars['Float'];
  skew_x: Scalars['Float'];
  skew_y: Scalars['Float'];
  width: Scalars['Float'];
  x: Scalars['Float'];
  y: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addTelegramChat: TelegramChat;
  checkInTimekeeping?: Maybe<Timekeeping>;
  checkOutTimekeeping?: Maybe<Timekeeping>;
  clipArtUpdatePreSignedFile?: Maybe<ClipArtMutateResponse>;
  createTag?: Maybe<Tag>;
  deleteBoard?: Maybe<BoardMutationResponse>;
  deleteClipArt?: Maybe<ClipArtMutateResponse>;
  deleteClipArtCategory?: Maybe<ClipArtCategoryMutateResponse>;
  deleteComment?: Maybe<Comment>;
  deleteIP?: Maybe<IpMutationResponse>;
  deleteMockup?: Maybe<MockupMutation>;
  deleteOrganization?: Maybe<OrganizationMutationResponse>;
  deleteTask?: Maybe<TaskMutationResponse>;
  deleteUser: UserMutateResponse;
  deleteWorkspace: WorkspaceMutationResponse;
  leaveOfAbsenceTimekeeping?: Maybe<Timekeeping>;
  maskCompleteTask?: Maybe<TaskMutationResponse>;
  moveTaskToWorkspace?: Maybe<TaskMutationResponse>;
  offlineTimekeeping?: Maybe<Timekeeping>;
  postComment: Comment;
  remoteWorkTimekeeping?: Maybe<Timekeeping>;
  saveBoard?: Maybe<BoardMutationResponse>;
  saveClipArtCategory?: Maybe<ClipArtCategoryMutateResponse>;
  saveIP?: Maybe<Ip>;
  saveMockup?: Maybe<MockupMutation>;
  saveOrganization?: Maybe<OrganizationMutationResponse>;
  saveSiteConfig?: Maybe<SiteConfig>;
  saveTask?: Maybe<TaskMutationResponse>;
  saveUser: UserMutateResponse;
  saveUserPermission: User;
  saveWorkspace: WorkspaceMutationResponse;
  sendInvite: InviteWorkspaceResponse;
  signIn: Auth;
  signOut: SignOutResponse;
  signUp: SignUpResponse;
  signedUploadClipArt?: Maybe<ClipArtMutateResponse>;
  sortBoards?: Maybe<SortBoardMutationResponse>;
  sortTasks?: Maybe<SortTaskMutationResponse>;
  startTask: TaskMutationResponse;
  switchOrganization: Organization;
  telegramAuthorize?: Maybe<TelegramChat>;
  updateComment: Comment;
  updateShop: Shop;
  uploadClipArt?: Maybe<ClipArtMutateResponse>;
  uploadFile: FileMutationResponse;
  verifyInvite?: Maybe<Workspace>;
  verifyTelegramChat: TelegramChat;
};


export type MutationAddTelegramChatArgs = {
  inputTelegram: InputTelegramChat;
};


export type MutationCheckInTimekeepingArgs = {
  lat?: InputMaybe<Scalars['Float']>;
  long?: InputMaybe<Scalars['Float']>;
};


export type MutationCheckOutTimekeepingArgs = {
  lat?: InputMaybe<Scalars['Float']>;
  long?: InputMaybe<Scalars['Float']>;
};


export type MutationClipArtUpdatePreSignedFileArgs = {
  id: Scalars['ID'];
};


export type MutationCreateTagArgs = {
  inputTag: InputTag;
};


export type MutationDeleteBoardArgs = {
  id: Scalars['String'];
};


export type MutationDeleteClipArtArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteClipArtCategoryArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteCommentArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteIpArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteMockupArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteOrganizationArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteTaskArgs = {
  id: Scalars['String'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteWorkspaceArgs = {
  id: Scalars['String'];
};


export type MutationLeaveOfAbsenceTimekeepingArgs = {
  ended_at: Scalars['Date'];
  reason: Scalars['String'];
  started_at: Scalars['Date'];
};


export type MutationMaskCompleteTaskArgs = {
  id: Scalars['String'];
  is_completed: Scalars['Boolean'];
};


export type MutationMoveTaskToWorkspaceArgs = {
  task_id: Scalars['String'];
  workspace_id: Scalars['String'];
};


export type MutationOfflineTimekeepingArgs = {
  ended_at: Scalars['Date'];
  reason: Scalars['String'];
  started_at: Scalars['Date'];
};


export type MutationPostCommentArgs = {
  inputComment: InputComment;
};


export type MutationRemoteWorkTimekeepingArgs = {
  ended_at: Scalars['Date'];
  reason: Scalars['String'];
  started_at: Scalars['Date'];
};


export type MutationSaveBoardArgs = {
  inputBoard: InputBoard;
};


export type MutationSaveClipArtCategoryArgs = {
  file?: InputMaybe<Scalars['Upload']>;
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
};


export type MutationSaveIpArgs = {
  inputIP: InputIp;
};


export type MutationSaveMockupArgs = {
  inputMockup: InputMockup;
};


export type MutationSaveOrganizationArgs = {
  inputOrganization: InputOrganization;
};


export type MutationSaveSiteConfigArgs = {
  inputSiteConfig: InputSiteConfig;
};


export type MutationSaveTaskArgs = {
  inputTask: InputTask;
};


export type MutationSaveUserArgs = {
  inputUser: InputUser;
};


export type MutationSaveUserPermissionArgs = {
  id: Scalars['ID'];
  permissions?: InputMaybe<Array<InputPermission>>;
};


export type MutationSaveWorkspaceArgs = {
  inputWorkspace: InputWorkspace;
};


export type MutationSendInviteArgs = {
  inputInvite: InputInvite;
};


export type MutationSignInArgs = {
  signInInput: SignInInput;
};


export type MutationSignUpArgs = {
  signUpInput: SignUpInput;
};


export type MutationSignedUploadClipArtArgs = {
  category_id: Scalars['ID'];
  filename: Scalars['String'];
  mimetype: Scalars['String'];
  type: Scalars['String'];
};


export type MutationSortBoardsArgs = {
  inputSortBoards: Array<SortBoard>;
};


export type MutationSortTasksArgs = {
  inputSortTask: Array<SortTask>;
};


export type MutationStartTaskArgs = {
  task_id: Scalars['ID'];
};


export type MutationSwitchOrganizationArgs = {
  id: Scalars['ID'];
  userId: Scalars['ID'];
};


export type MutationTelegramAuthorizeArgs = {
  inputAuthorize: InputTelegramAuthorize;
};


export type MutationUpdateCommentArgs = {
  inputComment: InputComment;
};


export type MutationUpdateShopArgs = {
  input: ShopInput;
};


export type MutationUploadClipArtArgs = {
  file: Scalars['Upload'];
};


export type MutationUploadFileArgs = {
  file: Scalars['Upload'];
  filename: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  is_chunk: Scalars['Boolean'];
  is_end?: InputMaybe<Scalars['Boolean']>;
  mimetype: Scalars['String'];
  part_number?: InputMaybe<Scalars['Int']>;
};


export type MutationVerifyInviteArgs = {
  id: Scalars['String'];
};


export type MutationVerifyTelegramChatArgs = {
  code: Scalars['String'];
  organization_id: Scalars['ID'];
};

export type Organization = {
  __typename?: 'Organization';
  _id: Scalars['ID'];
  created_at: Scalars['Date'];
  description: Scalars['String'];
  ips?: Maybe<Array<Ip>>;
  members?: Maybe<Array<User>>;
  name: Scalars['String'];
  telegram?: Maybe<OrganizationTelegram>;
  total_tasks: Scalars['Int'];
  total_workspaces: Scalars['Int'];
  updated_at?: Maybe<Scalars['Date']>;
  user?: Maybe<User>;
  user_id: Scalars['ID'];
};

export type OrganizationMutationResponse = {
  __typename?: 'OrganizationMutationResponse';
  errorFields?: Maybe<Array<ErrorField>>;
  message?: Maybe<Scalars['String']>;
  organization?: Maybe<Organization>;
  success?: Maybe<Scalars['Boolean']>;
};

export type OrganizationPaginate = {
  __typename?: 'OrganizationPaginate';
  items?: Maybe<Array<Organization>>;
  paginate?: Maybe<Paginate>;
};

export type OrganizationShortcut = {
  __typename?: 'OrganizationShortcut';
  _id: Scalars['ID'];
  name: Scalars['String'];
};

export type OrganizationTelegram = {
  __typename?: 'OrganizationTelegram';
  actions?: Maybe<Array<TelegramAction>>;
  active: Scalars['Boolean'];
  group: TelegramChat;
};

export type Paginate = {
  __typename?: 'Paginate';
  current_page?: Maybe<Scalars['Int']>;
  total_items?: Maybe<Scalars['Int']>;
  total_pages?: Maybe<Scalars['Int']>;
};

export type Permission = {
  __typename?: 'Permission';
  accept: Scalars['Boolean'];
  id: Scalars['String'];
  name: Scalars['String'];
};

export type Product = {
  __typename?: 'Product';
  _id: Scalars['ID'];
  created_at: Scalars['Date'];
  files?: Maybe<ProductFile>;
  identity: Scalars['String'];
  images?: Maybe<Array<File>>;
  imported_at: Scalars['Date'];
  meta?: Maybe<Array<ProductMeta>>;
  name: Scalars['String'];
  referent: Scalars['String'];
  sku: Scalars['String'];
  tags?: Maybe<Array<Scalars['String']>>;
};

export type ProductFile = {
  __typename?: 'ProductFile';
  back?: Maybe<File>;
  front?: Maybe<File>;
  hood?: Maybe<File>;
  sleeve?: Maybe<File>;
};

export type ProductMeta = {
  __typename?: 'ProductMeta';
  name?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type ProductPaginate = {
  __typename?: 'ProductPaginate';
  items?: Maybe<Array<Product>>;
  paginate: Paginate;
};

export type Query = {
  __typename?: 'Query';
  authToken: AuthToken;
  boards?: Maybe<Array<Board>>;
  clipArt?: Maybe<ClipArt>;
  clipArtCategory?: Maybe<ClipArtCategory>;
  clipArtCategoryPaginate?: Maybe<ClipArtCategoryPaginate>;
  clipArtsPaginate?: Maybe<ClipArtPaginate>;
  collection?: Maybe<Collection>;
  collections?: Maybe<Array<Maybe<Collection>>>;
  comments: Array<Comment>;
  commentsPaginate?: Maybe<CommentPaginate>;
  currentIP?: Maybe<CurrentIp>;
  currentOrganization: Organization;
  dashboardSummary: DashboardSummary;
  filesPaginate?: Maybe<FilePaginate>;
  me?: Maybe<Auth>;
  meExtension?: Maybe<Auth>;
  mockup?: Maybe<Mockup>;
  mockupsPaginate: MockupPaginate;
  organization: Organization;
  organizationPaginate?: Maybe<OrganizationPaginate>;
  organizations?: Maybe<Array<Organization>>;
  productPaginate: ProductPaginate;
  rolePermissions?: Maybe<Array<RolePermission>>;
  search?: Maybe<Array<SearchResult>>;
  shop: Shop;
  siteConfig?: Maybe<SiteConfig>;
  tags?: Maybe<Array<Maybe<Tag>>>;
  task: Task;
  tasks: Array<Task>;
  tasksPaginate?: Maybe<TaskPaginate>;
  telegramChats?: Maybe<Array<TelegramChat>>;
  timekeeping?: Maybe<Array<Timekeeping>>;
  timekeepingByRole?: Maybe<Array<Timekeeping>>;
  userCollectionSummary?: Maybe<Array<UserCollectionSummary>>;
  userPermissions?: Maybe<Array<Permission>>;
  userReportSummary?: Maybe<UserReportSummaryReport>;
  userReportWorkspaceSummary?: Maybe<Array<WorkspaceKpi>>;
  userTelegram?: Maybe<TelegramChat>;
  userWorkspaceBoardSummary?: Maybe<Array<WorkspaceBoardSummary>>;
  userWorkspaceTaskSummary?: Maybe<TaskSummary>;
  users: Array<User>;
  usersPaginate?: Maybe<UserPaginate>;
  workspace: Workspace;
  workspaceCount?: Maybe<Array<Maybe<WorkspaceCounter>>>;
  workspaceMembers?: Maybe<Array<User>>;
  workspaces: Array<Workspace>;
};


export type QueryBoardsArgs = {
  account_id: Scalars['String'];
  workspace_id: Scalars['String'];
};


export type QueryClipArtArgs = {
  id: Scalars['ID'];
};


export type QueryClipArtCategoryArgs = {
  id: Scalars['ID'];
};


export type QueryClipArtCategoryPaginateArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
};


export type QueryClipArtsPaginateArgs = {
  category_id: Scalars['ID'];
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
};


export type QueryCollectionArgs = {
  id: Scalars['ID'];
};


export type QueryCollectionsArgs = {
  search: Scalars['String'];
};


export type QueryCommentsArgs = {
  referent_id: Scalars['ID'];
};


export type QueryCommentsPaginateArgs = {
  page: Scalars['Int'];
  perpage: Scalars['Int'];
  referent_id: Scalars['ID'];
};


export type QueryDashboardSummaryArgs = {
  end: Scalars['Date'];
  start: Scalars['Date'];
};


export type QueryFilesPaginateArgs = {
  accept?: InputMaybe<Scalars['String']>;
  page: Scalars['Int'];
  perpage: Scalars['Int'];
  search?: InputMaybe<Scalars['String']>;
};


export type QueryMockupArgs = {
  id: Scalars['ID'];
};


export type QueryMockupsPaginateArgs = {
  inputPaginate: InputMockupPaginate;
};


export type QueryOrganizationArgs = {
  id: Scalars['ID'];
};


export type QueryOrganizationPaginateArgs = {
  inputQuery: InputQueryOrganization;
};


export type QueryProductPaginateArgs = {
  page: Scalars['Int'];
  perpage: Scalars['Int'];
  search?: InputMaybe<Scalars['String']>;
};


export type QueryRolePermissionsArgs = {
  role: Scalars['String'];
};


export type QuerySearchArgs = {
  search: Scalars['String'];
};


export type QueryShopArgs = {
  id?: InputMaybe<Scalars['String']>;
};


export type QueryTagsArgs = {
  search: Scalars['String'];
};


export type QueryTaskArgs = {
  id: Scalars['ID'];
};


export type QueryTasksArgs = {
  account_id?: InputMaybe<Scalars['String']>;
  board_id?: InputMaybe<Scalars['String']>;
};


export type QueryTasksPaginateArgs = {
  account_id?: InputMaybe<Scalars['String']>;
  assignee_email: Scalars['String'];
  board_id?: InputMaybe<Scalars['String']>;
  due_end: Scalars['Date'];
  due_start: Scalars['Date'];
  end: Scalars['Date'];
  page: Scalars['Int'];
  perpage: Scalars['Int'];
  search: Scalars['String'];
  sortBy?: InputMaybe<Scalars['String']>;
  start: Scalars['Date'];
};


export type QueryTelegramChatsArgs = {
  organization_id: Scalars['ID'];
  type: Scalars['String'];
};


export type QueryTimekeepingArgs = {
  ended_at?: InputMaybe<Scalars['Date']>;
  started_at?: InputMaybe<Scalars['Date']>;
};


export type QueryTimekeepingByRoleArgs = {
  ended_at?: InputMaybe<Scalars['Date']>;
  started_at?: InputMaybe<Scalars['Date']>;
  user_id?: InputMaybe<Scalars['ID']>;
};


export type QueryUserCollectionSummaryArgs = {
  end: Scalars['Date'];
  organization_id: Scalars['ID'];
  start: Scalars['Date'];
  user_id: Scalars['ID'];
  workspace_id: Scalars['ID'];
};


export type QueryUserPermissionsArgs = {
  user_id: Scalars['ID'];
};


export type QueryUserReportSummaryArgs = {
  end: Scalars['Date'];
  organization_id: Scalars['ID'];
  page: Scalars['Int'];
  perpage: Scalars['Int'];
  start: Scalars['Date'];
};


export type QueryUserReportWorkspaceSummaryArgs = {
  end: Scalars['Date'];
  organization_id: Scalars['ID'];
  start: Scalars['Date'];
  user_id: Scalars['ID'];
};


export type QueryUserTelegramArgs = {
  user_id: Scalars['ID'];
};


export type QueryUserWorkspaceBoardSummaryArgs = {
  end: Scalars['Date'];
  organization_id: Scalars['ID'];
  start: Scalars['Date'];
  user_id: Scalars['ID'];
  workspace_id: Scalars['ID'];
};


export type QueryUserWorkspaceTaskSummaryArgs = {
  board_id: Scalars['ID'];
  end: Scalars['Date'];
  organization_id: Scalars['ID'];
  start: Scalars['Date'];
  user_id: Scalars['ID'];
  workspace_id: Scalars['ID'];
};


export type QueryUsersArgs = {
  search?: InputMaybe<Scalars['String']>;
};


export type QueryUsersPaginateArgs = {
  page: Scalars['Int'];
  perpage: Scalars['Int'];
  search: Scalars['String'];
};


export type QueryWorkspaceArgs = {
  id?: InputMaybe<Scalars['String']>;
};


export type QueryWorkspaceCountArgs = {
  ids: Array<Scalars['String']>;
};


export type QueryWorkspaceMembersArgs = {
  id: Scalars['String'];
};

export enum Role {
  Admin = 'ADMIN',
  Designer = 'DESIGNER',
  Hr = 'HR',
  Seller = 'SELLER',
  SuperAdmin = 'SUPER_ADMIN',
  User = 'USER'
}

export type RolePermission = {
  __typename?: 'RolePermission';
  id: Scalars['String'];
  name: Scalars['String'];
  permissions?: Maybe<Array<Permission>>;
};

export type SearchResult = {
  __typename?: 'SearchResult';
  category: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  media?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  url: Scalars['String'];
};

export type SettingNameValue = {
  __typename?: 'SettingNameValue';
  name: Scalars['String'];
  value: Scalars['String'];
};

export type Shop = {
  __typename?: 'Shop';
  _id?: Maybe<Scalars['ID']>;
  domain: Scalars['String'];
  name: Scalars['String'];
  shop_id: Scalars['Int'];
};

export type ShopInput = {
  name: Scalars['String'];
};

export type SignInInput = {
  email: Scalars['Email'];
  password: Scalars['Password'];
  remember: Scalars['Boolean'];
};

export type SignOutResponse = {
  __typename?: 'SignOutResponse';
  message: Scalars['String'];
  success: Scalars['Boolean'];
};

export type SignUpInput = {
  email: Scalars['Email'];
  first_name: Scalars['String'];
  last_name: Scalars['String'];
  password: Scalars['Password'];
};

export type SignUpResponse = {
  __typename?: 'SignUpResponse';
  message: Scalars['String'];
  success: Scalars['Boolean'];
};

export type SiteConfig = {
  __typename?: 'SiteConfig';
  logo?: Maybe<File>;
  logo_height?: Maybe<Scalars['Float']>;
  logo_width?: Maybe<Scalars['Float']>;
};

export type SortBoard = {
  _id: Scalars['String'];
  board_index: Scalars['Int'];
};

export type SortBoardMutationResponse = {
  __typename?: 'SortBoardMutationResponse';
  errorFields?: Maybe<Array<ErrorField>>;
  message: Scalars['String'];
};

export type SortTask = {
  _id: Scalars['String'];
  board_id: Scalars['String'];
  task_index: Scalars['Int'];
};

export type SortTaskMutationResponse = {
  __typename?: 'SortTaskMutationResponse';
  errorFields?: Maybe<Array<ErrorField>>;
  message: Scalars['String'];
};

export type Tag = {
  __typename?: 'Tag';
  _id: Scalars['ID'];
  color?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

export type Task = {
  __typename?: 'Task';
  _id: Scalars['ID'];
  actual_duration_type: Scalars['String'];
  actual_duration_unit: Scalars['Int'];
  actual_started_at: Scalars['Date'];
  assign?: Maybe<User>;
  assign_id: Scalars['String'];
  board?: Maybe<Board>;
  collection_id?: Maybe<Scalars['ID']>;
  collections?: Maybe<Array<Collection>>;
  completed_at: Scalars['Date'];
  created_at: Scalars['Date'];
  description: Scalars['String'];
  duration_time: Scalars['Int'];
  expect_duration_type: Scalars['String'];
  expect_duration_unit: Scalars['Int'];
  expect_started_at: Scalars['Date'];
  expired_at: Scalars['Date'];
  is_completed: Scalars['Boolean'];
  name: Scalars['String'];
  origin_id?: Maybe<Scalars['String']>;
  parent?: Maybe<Task>;
  parent_id?: Maybe<Scalars['ID']>;
  personalization?: Maybe<Scalars['Boolean']>;
  product: Product;
  product_id: Scalars['ID'];
  psd_files?: Maybe<Array<File>>;
  reference: Task;
  reference_id: Scalars['String'];
  referer: Scalars['String'];
  request_files?: Maybe<Array<File>>;
  resource_meta?: Maybe<Array<TaskResource>>;
  response_files?: Maybe<Array<File>>;
  tags?: Maybe<Array<TaskTag>>;
  task_index: Scalars['Int'];
  tasks?: Maybe<Array<Task>>;
  updated_at: Scalars['Date'];
  user: User;
  user_id: Scalars['String'];
};

export type TaskMutationResponse = {
  __typename?: 'TaskMutationResponse';
  errorFields?: Maybe<Array<ErrorField>>;
  message: Scalars['String'];
  task?: Maybe<Task>;
};

export type TaskPaginate = {
  __typename?: 'TaskPaginate';
  items: Array<Task>;
  paginate: Paginate;
};

export type TaskResource = {
  __typename?: 'TaskResource';
  name: Scalars['String'];
  value: Scalars['String'];
};

export type TaskSummary = {
  __typename?: 'TaskSummary';
  total_actual_time: Scalars['Int'];
  total_completed: Scalars['Int'];
  total_estimate_time: Scalars['Int'];
  total_tasks: Scalars['Int'];
};

export type TaskTag = {
  __typename?: 'TaskTag';
  _id: Scalars['ID'];
  color: Scalars['String'];
  name: Scalars['String'];
};

export type TelegramAction = {
  __typename?: 'TelegramAction';
  action: Scalars['String'];
  active: Scalars['Boolean'];
  groups?: Maybe<Array<TelegramChat>>;
};

export type TelegramChat = {
  __typename?: 'TelegramChat';
  _id: Scalars['ID'];
  chat_id: Scalars['Int'];
  first_name: Scalars['String'];
  last_name: Scalars['String'];
  title: Scalars['String'];
  type: Scalars['String'];
  username: Scalars['String'];
};

export type TelegramGroup = {
  __typename?: 'TelegramGroup';
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type Timekeeping = {
  __typename?: 'Timekeeping';
  _id: Scalars['ID'];
  created_at: Scalars['Date'];
  ended_at: Scalars['Date'];
  reason: Scalars['String'];
  started_at: Scalars['Date'];
  status: TimekeepingStatus;
  type: TimekeepingType;
  updated_at: Scalars['Date'];
  user: User;
  user_id: Scalars['String'];
};

export enum TimekeepingStatus {
  Approve = 'APPROVE',
  Deny = 'DENY',
  Wait = 'WAIT'
}

export enum TimekeepingType {
  CheckIn = 'CHECK_IN',
  CheckOut = 'CHECK_OUT',
  LeaveOfAbsence = 'LEAVE_OF_ABSENCE',
  Offline = 'OFFLINE',
  RemoteWork = 'REMOTE_WORK'
}

export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  bonus_per_hour: Scalars['Float'];
  created_at: Scalars['Date'];
  email: Scalars['String'];
  first_name: Scalars['String'];
  last_name: Scalars['String'];
  organization?: Maybe<OrganizationShortcut>;
  organization_id: Scalars['ID'];
  permissions?: Maybe<Array<Permission>>;
  role: Scalars['String'];
  updated_at?: Maybe<Scalars['Date']>;
  working_hours_per_month: Scalars['Float'];
};

export type UserCollectionSummary = {
  __typename?: 'UserCollectionSummary';
  collection: Collection;
  data: TaskSummary;
};

export type UserMutateResponse = {
  __typename?: 'UserMutateResponse';
  errorFields?: Maybe<Array<ErrorField>>;
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
  user?: Maybe<User>;
};

export type UserPaginate = {
  __typename?: 'UserPaginate';
  items: Array<User>;
  paginate: Paginate;
};

export type UserReportSummary = {
  __typename?: 'UserReportSummary';
  data: TaskSummary;
  user: User;
};

export type UserReportSummaryReport = {
  __typename?: 'UserReportSummaryReport';
  items?: Maybe<Array<UserReportSummary>>;
  paginate?: Maybe<Paginate>;
};

export enum UserStatus {
  Active = 'ACTIVE',
  Deactive = 'DEACTIVE'
}

export type Workspace = {
  __typename?: 'Workspace';
  _id: Scalars['ID'];
  color: Scalars['String'];
  created_at: Scalars['Date'];
  default_assignee?: Maybe<User>;
  default_assignee_id: Scalars['ID'];
  deleted_at?: Maybe<Scalars['Date']>;
  is_archived?: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
  organization?: Maybe<Organization>;
  total?: Maybe<Scalars['Int']>;
  type: WorkspaceType;
  user: User;
  user_id: Scalars['ID'];
};

export type WorkspaceBoard = {
  __typename?: 'WorkspaceBoard';
  _id: Scalars['String'];
  board_id: Scalars['String'];
};

export type WorkspaceBoardSummary = {
  __typename?: 'WorkspaceBoardSummary';
  board: Board;
  data: TaskSummary;
};

export type WorkspaceCounter = {
  __typename?: 'WorkspaceCounter';
  _id: Scalars['String'];
  total: Scalars['Int'];
};

export type WorkspaceKpi = {
  __typename?: 'WorkspaceKpi';
  data: TaskSummary;
  workspace: Workspace;
};

export type WorkspaceMutationResponse = {
  __typename?: 'WorkspaceMutationResponse';
  errorFields?: Maybe<Array<ErrorField>>;
  message?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
  workspace?: Maybe<Workspace>;
};

export enum WorkspaceType {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type WorkspaceUser = {
  __typename?: 'WorkspaceUser';
  _id: Scalars['String'];
  user_id: Scalars['String'];
  users?: Maybe<Array<User>>;
  workspace_id: Scalars['String'];
};

export type InputQueryOrganization = {
  end: Scalars['Date'];
  page: Scalars['Int'];
  perpage: Scalars['Int'];
  search: Scalars['String'];
  sort: Scalars['Int'];
  sortBy: Scalars['String'];
  start: Scalars['Date'];
};

export type UserFragment = { __typename?: 'User', _id: string, first_name: string, last_name: string, email: string, role: string, organization_id: string, created_at: any, working_hours_per_month: number, bonus_per_hour: number, organization?: { __typename?: 'OrganizationShortcut', _id: string, name: string } | null };

export type AuthFragment = { __typename?: 'Auth', _id: string, first_name: string, last_name: string, email: string, role: string, created_at: any, permissions?: Array<{ __typename?: 'Permission', id: string, name: string, accept: boolean }> | null, token?: { __typename?: 'AuthToken', access_token: string, refresh_token: string, token_type: string, expired_at: any } | null };

export type SignOutResponseFragment = { __typename?: 'SignOutResponse', success: boolean, message: string };

export type AuthTokenFragment = { __typename?: 'AuthToken', access_token: string, refresh_token: string, token_type: string, expired_at: any };

export type UserMutateResponseFragment = { __typename?: 'UserMutateResponse', success: boolean, message?: string | null, user?: { __typename?: 'User', _id: string, first_name: string, last_name: string, email: string, role: string, organization_id: string, created_at: any, working_hours_per_month: number, bonus_per_hour: number, organization?: { __typename?: 'OrganizationShortcut', _id: string, name: string } | null } | null, errorFields?: Array<{ __typename?: 'ErrorField', name: string, message: string }> | null };

export type RolePermissionFragment = { __typename?: 'RolePermission', id: string, name: string, permissions?: Array<{ __typename?: 'Permission', id: string, name: string, accept: boolean }> | null };

export type PermissionFragment = { __typename?: 'Permission', id: string, name: string, accept: boolean };

export type ErrorFieldResponseFragment = { __typename?: 'ErrorField', name: string, message: string };

export type PaginateFragment = { __typename?: 'Paginate', total_items?: number | null, total_pages?: number | null, current_page?: number | null };

export type SearchResultFragment = { __typename?: 'SearchResult', media?: string | null, category: string, title: string, description?: string | null, url: string };

export type OrganizationFragment = { __typename?: 'Organization', _id: string, name: string, description: string, user_id: string, total_workspaces: number, total_tasks: number, created_at: any, updated_at?: any | null, user?: { __typename?: 'User', _id: string, first_name: string, last_name: string, email: string, role: string, organization_id: string, created_at: any, working_hours_per_month: number, bonus_per_hour: number, organization?: { __typename?: 'OrganizationShortcut', _id: string, name: string } | null } | null, members?: Array<{ __typename?: 'User', _id: string, first_name: string, last_name: string, email: string, role: string, organization_id: string, created_at: any, working_hours_per_month: number, bonus_per_hour: number, organization?: { __typename?: 'OrganizationShortcut', _id: string, name: string } | null }> | null };

export type OrganizationDetailFragment = { __typename?: 'Organization', _id: string, name: string, description: string, user_id: string, total_workspaces: number, total_tasks: number, created_at: any, updated_at?: any | null, user?: { __typename?: 'User', _id: string, first_name: string, last_name: string, email: string, role: string, organization_id: string, created_at: any, working_hours_per_month: number, bonus_per_hour: number, organization?: { __typename?: 'OrganizationShortcut', _id: string, name: string } | null } | null, members?: Array<{ __typename?: 'User', _id: string, first_name: string, last_name: string, email: string, role: string, organization_id: string, created_at: any, working_hours_per_month: number, bonus_per_hour: number, organization?: { __typename?: 'OrganizationShortcut', _id: string, name: string } | null }> | null };

export type OrganizationMutationResponseFragment = { __typename?: 'OrganizationMutationResponse', success?: boolean | null, message?: string | null, organization?: { __typename?: 'Organization', _id: string, name: string, description: string, user_id: string, total_workspaces: number, total_tasks: number, created_at: any, updated_at?: any | null, user?: { __typename?: 'User', _id: string, first_name: string, last_name: string, email: string, role: string, organization_id: string, created_at: any, working_hours_per_month: number, bonus_per_hour: number, organization?: { __typename?: 'OrganizationShortcut', _id: string, name: string } | null } | null, members?: Array<{ __typename?: 'User', _id: string, first_name: string, last_name: string, email: string, role: string, organization_id: string, created_at: any, working_hours_per_month: number, bonus_per_hour: number, organization?: { __typename?: 'OrganizationShortcut', _id: string, name: string } | null }> | null } | null, errorFields?: Array<{ __typename?: 'ErrorField', name: string, message: string }> | null };

export type SignInMutationVariables = Exact<{
  signInInput: SignInInput;
}>;


export type SignInMutation = { __typename?: 'Mutation', signIn: { __typename?: 'Auth', _id: string, first_name: string, last_name: string, email: string, role: string, created_at: any, permissions?: Array<{ __typename?: 'Permission', id: string, name: string, accept: boolean }> | null, token?: { __typename?: 'AuthToken', access_token: string, refresh_token: string, token_type: string, expired_at: any } | null } };

export type SignOutMutationVariables = Exact<{ [key: string]: never; }>;


export type SignOutMutation = { __typename?: 'Mutation', signOut: { __typename?: 'SignOutResponse', success: boolean, message: string } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'Auth', _id: string, first_name: string, last_name: string, email: string, role: string, created_at: any, permissions?: Array<{ __typename?: 'Permission', id: string, name: string, accept: boolean }> | null, token?: { __typename?: 'AuthToken', access_token: string, refresh_token: string, token_type: string, expired_at: any } | null } | null, currentOrganization: { __typename?: 'Organization', _id: string, name: string, description: string, user_id: string, total_workspaces: number, total_tasks: number, created_at: any, updated_at?: any | null, user?: { __typename?: 'User', _id: string, first_name: string, last_name: string, email: string, role: string, organization_id: string, created_at: any, working_hours_per_month: number, bonus_per_hour: number, organization?: { __typename?: 'OrganizationShortcut', _id: string, name: string } | null } | null, members?: Array<{ __typename?: 'User', _id: string, first_name: string, last_name: string, email: string, role: string, organization_id: string, created_at: any, working_hours_per_month: number, bonus_per_hour: number, organization?: { __typename?: 'OrganizationShortcut', _id: string, name: string } | null }> | null }, meExtension?: { __typename?: 'Auth', _id: string, first_name: string, last_name: string, email: string, role: string, created_at: any, permissions?: Array<{ __typename?: 'Permission', id: string, name: string, accept: boolean }> | null, token?: { __typename?: 'AuthToken', access_token: string, refresh_token: string, token_type: string, expired_at: any } | null } | null };

export type AuthTokenQueryVariables = Exact<{ [key: string]: never; }>;


export type AuthTokenQuery = { __typename?: 'Query', authToken: { __typename?: 'AuthToken', access_token: string, refresh_token: string, token_type: string, expired_at: any } };

export type UsersQueryVariables = Exact<{
  search?: InputMaybe<Scalars['String']>;
}>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', _id: string, first_name: string, last_name: string, email: string, role: string, organization_id: string, created_at: any, working_hours_per_month: number, bonus_per_hour: number, organization?: { __typename?: 'OrganizationShortcut', _id: string, name: string } | null }> };

export type RolePermissionsQueryVariables = Exact<{
  role: Scalars['String'];
}>;


export type RolePermissionsQuery = { __typename?: 'Query', rolePermissions?: Array<{ __typename?: 'RolePermission', id: string, name: string, permissions?: Array<{ __typename?: 'Permission', id: string, name: string, accept: boolean }> | null }> | null };

export type UserPermissionsQueryVariables = Exact<{
  user_id: Scalars['ID'];
}>;


export type UserPermissionsQuery = { __typename?: 'Query', userPermissions?: Array<{ __typename?: 'Permission', id: string, name: string, accept: boolean }> | null };

export const PermissionFragmentDoc = gql`
    fragment Permission on Permission {
  id
  name
  accept
}
    `;
export const AuthTokenFragmentDoc = gql`
    fragment AuthToken on AuthToken {
  access_token
  refresh_token
  token_type
  expired_at
}
    `;
export const AuthFragmentDoc = gql`
    fragment Auth on Auth {
  _id
  first_name
  last_name
  email
  role
  created_at
  permissions {
    ...Permission
  }
  token {
    ...AuthToken
  }
}
    ${PermissionFragmentDoc}
${AuthTokenFragmentDoc}`;
export const SignOutResponseFragmentDoc = gql`
    fragment SignOutResponse on SignOutResponse {
  success
  message
}
    `;
export const UserFragmentDoc = gql`
    fragment User on User {
  _id
  first_name
  last_name
  email
  role
  organization_id
  organization {
    ... on OrganizationShortcut {
      _id
      name
    }
  }
  created_at
  working_hours_per_month
  bonus_per_hour
}
    `;
export const ErrorFieldResponseFragmentDoc = gql`
    fragment ErrorFieldResponse on ErrorField {
  name
  message
}
    `;
export const UserMutateResponseFragmentDoc = gql`
    fragment UserMutateResponse on UserMutateResponse {
  success
  user {
    ...User
  }
  message
  errorFields {
    ...ErrorFieldResponse
  }
}
    ${UserFragmentDoc}
${ErrorFieldResponseFragmentDoc}`;
export const RolePermissionFragmentDoc = gql`
    fragment RolePermission on RolePermission {
  id
  name
  permissions {
    ...Permission
  }
}
    ${PermissionFragmentDoc}`;
export const PaginateFragmentDoc = gql`
    fragment Paginate on Paginate {
  total_items
  total_pages
  current_page
}
    `;
export const SearchResultFragmentDoc = gql`
    fragment SearchResult on SearchResult {
  media
  category
  title
  description
  url
}
    `;
export const OrganizationFragmentDoc = gql`
    fragment Organization on Organization {
  _id
  name
  description
  user_id
  user {
    ...User
  }
  members {
    ...User
  }
  total_workspaces
  total_tasks
  created_at
  updated_at
}
    ${UserFragmentDoc}`;
export const OrganizationDetailFragmentDoc = gql`
    fragment OrganizationDetail on Organization {
  ...Organization
}
    ${OrganizationFragmentDoc}`;
export const OrganizationMutationResponseFragmentDoc = gql`
    fragment OrganizationMutationResponse on OrganizationMutationResponse {
  success
  message
  organization {
    ...OrganizationDetail
  }
  errorFields {
    ...ErrorFieldResponse
  }
}
    ${OrganizationDetailFragmentDoc}
${ErrorFieldResponseFragmentDoc}`;
export const SignInDocument = gql`
    mutation SignIn($signInInput: SignInInput!) {
  signIn(signInInput: $signInInput) {
    ...Auth
  }
}
    ${AuthFragmentDoc}`;
export type SignInMutationFn = Apollo.MutationFunction<SignInMutation, SignInMutationVariables>;

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      signInInput: // value for 'signInInput'
 *   },
 * });
 */
export function useSignInMutation(baseOptions?: Apollo.MutationHookOptions<SignInMutation, SignInMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignInMutation, SignInMutationVariables>(SignInDocument, options);
      }
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = Apollo.MutationResult<SignInMutation>;
export type SignInMutationOptions = Apollo.BaseMutationOptions<SignInMutation, SignInMutationVariables>;
export const SignOutDocument = gql`
    mutation SignOut {
  signOut {
    ...SignOutResponse
  }
}
    ${SignOutResponseFragmentDoc}`;
export type SignOutMutationFn = Apollo.MutationFunction<SignOutMutation, SignOutMutationVariables>;

/**
 * __useSignOutMutation__
 *
 * To run a mutation, you first call `useSignOutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignOutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signOutMutation, { data, loading, error }] = useSignOutMutation({
 *   variables: {
 *   },
 * });
 */
export function useSignOutMutation(baseOptions?: Apollo.MutationHookOptions<SignOutMutation, SignOutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignOutMutation, SignOutMutationVariables>(SignOutDocument, options);
      }
export type SignOutMutationHookResult = ReturnType<typeof useSignOutMutation>;
export type SignOutMutationResult = Apollo.MutationResult<SignOutMutation>;
export type SignOutMutationOptions = Apollo.BaseMutationOptions<SignOutMutation, SignOutMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...Auth
  }
  currentOrganization {
    ...Organization
  }
  meExtension {
    ...Auth
  }
}
    ${AuthFragmentDoc}
${OrganizationFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const AuthTokenDocument = gql`
    query AuthToken {
  authToken {
    ...AuthToken
  }
}
    ${AuthTokenFragmentDoc}`;

/**
 * __useAuthTokenQuery__
 *
 * To run a query within a React component, call `useAuthTokenQuery` and pass it any options that fit your needs.
 * When your component renders, `useAuthTokenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAuthTokenQuery({
 *   variables: {
 *   },
 * });
 */
export function useAuthTokenQuery(baseOptions?: Apollo.QueryHookOptions<AuthTokenQuery, AuthTokenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AuthTokenQuery, AuthTokenQueryVariables>(AuthTokenDocument, options);
      }
export function useAuthTokenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AuthTokenQuery, AuthTokenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AuthTokenQuery, AuthTokenQueryVariables>(AuthTokenDocument, options);
        }
export type AuthTokenQueryHookResult = ReturnType<typeof useAuthTokenQuery>;
export type AuthTokenLazyQueryHookResult = ReturnType<typeof useAuthTokenLazyQuery>;
export type AuthTokenQueryResult = Apollo.QueryResult<AuthTokenQuery, AuthTokenQueryVariables>;
export const UsersDocument = gql`
    query Users($search: String) {
  users(search: $search) {
    ...User
  }
}
    ${UserFragmentDoc}`;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *      search: // value for 'search'
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;
export const RolePermissionsDocument = gql`
    query RolePermissions($role: String!) {
  rolePermissions(role: $role) {
    ...RolePermission
  }
}
    ${RolePermissionFragmentDoc}`;

/**
 * __useRolePermissionsQuery__
 *
 * To run a query within a React component, call `useRolePermissionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useRolePermissionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRolePermissionsQuery({
 *   variables: {
 *      role: // value for 'role'
 *   },
 * });
 */
export function useRolePermissionsQuery(baseOptions: Apollo.QueryHookOptions<RolePermissionsQuery, RolePermissionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RolePermissionsQuery, RolePermissionsQueryVariables>(RolePermissionsDocument, options);
      }
export function useRolePermissionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RolePermissionsQuery, RolePermissionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RolePermissionsQuery, RolePermissionsQueryVariables>(RolePermissionsDocument, options);
        }
export type RolePermissionsQueryHookResult = ReturnType<typeof useRolePermissionsQuery>;
export type RolePermissionsLazyQueryHookResult = ReturnType<typeof useRolePermissionsLazyQuery>;
export type RolePermissionsQueryResult = Apollo.QueryResult<RolePermissionsQuery, RolePermissionsQueryVariables>;
export const UserPermissionsDocument = gql`
    query UserPermissions($user_id: ID!) {
  userPermissions(user_id: $user_id) {
    ...Permission
  }
}
    ${PermissionFragmentDoc}`;

/**
 * __useUserPermissionsQuery__
 *
 * To run a query within a React component, call `useUserPermissionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserPermissionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserPermissionsQuery({
 *   variables: {
 *      user_id: // value for 'user_id'
 *   },
 * });
 */
export function useUserPermissionsQuery(baseOptions: Apollo.QueryHookOptions<UserPermissionsQuery, UserPermissionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserPermissionsQuery, UserPermissionsQueryVariables>(UserPermissionsDocument, options);
      }
export function useUserPermissionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserPermissionsQuery, UserPermissionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserPermissionsQuery, UserPermissionsQueryVariables>(UserPermissionsDocument, options);
        }
export type UserPermissionsQueryHookResult = ReturnType<typeof useUserPermissionsQuery>;
export type UserPermissionsLazyQueryHookResult = ReturnType<typeof useUserPermissionsLazyQuery>;
export type UserPermissionsQueryResult = Apollo.QueryResult<UserPermissionsQuery, UserPermissionsQueryVariables>;