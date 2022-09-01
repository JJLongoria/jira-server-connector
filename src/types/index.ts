import { AxiosError } from "axios";
import { HTTP, HTTPRequest } from "../core/http";

export class Basic {

    private readonly API_ENDPOINT = '/rest/api/latest';

    user: string;
    password: string;
    host: string;
    apiEndpoint: string;

    constructor(auth: BasicAuth) {
        this.user = auth.user;
        this.password = auth.password;
        this.host = auth.host;
        this.apiEndpoint = this.processURL(auth.host) + this.API_ENDPOINT;
    }

    encode() {
        return btoa(this.user + ':' + this.password);
    }

    header() {
        return 'Basic ' + this.encode();
    }

    private processURL(url: string) {
        if (url.endsWith('/')) {
            return url.substring(0, url.length - 2);
        }
        return url;
    }

}

export interface BasicAuth {

    user: string;
    password: string;
    host: string;

}

export interface EndpointServiceOptions {
    pageOptions?: PageOptions;
    param?: any;
}

export class EndpointService {
    private readonly AUTH_HEADER = 'Authorization';
    protected auth: Basic;
    protected path: string;

    constructor(auth: Basic, path: string) {
        this.auth = new Basic({
            host: auth.host,
            user: auth.user,
            password: auth.password
        });
        this.auth.apiEndpoint = auth.apiEndpoint;
        this.path = path;
        this.auth.apiEndpoint += path;
    }

    private setPageOptions(request: HTTPRequest, pageOptions?: PageOptions) {
        this.processOptions(request, pageOptions);
    }

    private getEndpoint(options?: EndpointServiceOptions) {
        let endpoint = this.auth.apiEndpoint;
        if (options?.param) {
            endpoint += '/' + options?.param;
        }
        return endpoint;
    }

    protected processOptions(request: HTTPRequest, options?: any) {
        if (options) {
            for (const key of Object.keys(options)) {
                const value = options[key];
                if (key !== 'pageOptions' && value !== undefined) {
                    request.addQueryParam(key, value);
                }
            }
        }
    }

    protected doGet(options?: EndpointServiceOptions) {
        const endpoint = this.getEndpoint(options);
        const request = HTTP.get(endpoint).addHeader(this.AUTH_HEADER, this.auth.header());
        this.setPageOptions(request, options?.pageOptions);
        return request;
    }

    protected doPost(options?: EndpointServiceOptions) {
        const endpoint = this.getEndpoint(options);
        const request = HTTP.post(endpoint).addHeader(this.AUTH_HEADER, this.auth.header());
        this.setPageOptions(request, options?.pageOptions);
        return request;
    }

    protected doPut(options?: EndpointServiceOptions) {
        const endpoint = this.getEndpoint(options);
        const request = HTTP.put(endpoint).addHeader(this.AUTH_HEADER, this.auth.header());
        this.setPageOptions(request, options?.pageOptions);
        return request;
    }

    protected doDelete(options?: EndpointServiceOptions) {
        const endpoint = this.getEndpoint(options);
        const request = HTTP.delete(endpoint).addHeader(this.AUTH_HEADER, this.auth.header());
        this.setPageOptions(request, options?.pageOptions);
        return request;
    }
}

export class JiraError extends Error {

    statusCode: number;
    status?: string;
    statusText?: string;
    errors?: JiraErrorData[];

    constructor(error: AxiosError) {
        super(error.message);
        this.statusCode = error.response?.status || 400;
        this.name = 'JiraError';
        this.stack = error.stack;
        this.status = error.status;
        this.statusText = error.response?.statusText;
        if (error.response && error.response.data) {
            const data = error.response.data as any;
            if (data.errors) {
                this.errors = data.errors as JiraErrorData[];
            }
        }
    }

}

export interface JiraErrorData {
    id: string;
    title: string;
    type: string;
    properties: JiraErrorProperties;
    additionalProperties: boolean;
}

export interface JiraErrorProperties {
    errorMessages: any;
    errors: any;
    status: any;
}

export interface PageOptions {
    maxResults?: number;
    startAt?: number;
    orderBy?: string;
}

export class Page<T> {
    startAt: number = 0;
    maxResults: number = 0;
    total: number = 0;
    isLast: boolean = true;
    values: T[] = [];
}

export interface PermissionsOutput {
    permisions: { [key: string]: Permission }
}

export interface UserPermissionsOutput {
    permisions: { [key: string]: UserPermission }
}

export interface UserPermissionsOptions {
    projectKey?: string;
    projectId?: string;
    issueKey?: string;
    issueId?: string;
}

export interface UserPermission {
    id: string;
    key: string;
    name: string;
    type: string;
    description: string;
    havePermission: boolean;
}

export interface Permission {
    key: string;
    name: string;
    type: string;
    description: string;
}

export interface ApplicationPropertiesOptions {
    key?: string;
    permissionLevel?: string;
    keyFilter?: string;
}

export interface ApplicationPropertyInput {
    value?: string;
    name?: string;
    desc?: string;
    type?: string;
    defaultValue?: string;
    example?: string;
    allowedValues?: string[];
}

export interface ApplicationProperty {
    id: string;
    key: string;
    value: string;
    name: string;
    desc: string;
    type: string;
    defaultValue: string;
    example?: string;
    allowedValues?: string[];
}