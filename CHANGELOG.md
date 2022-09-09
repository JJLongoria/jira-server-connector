# Change Log
All notable changes to this project will be documented in this file.

## [0.0.1 - 2022-08-31]
### Added
- **Implemented all Permission Endpoints (`/rest/api/latest/`)**:

    - `/rest/api/latest/mypermissions` (GET)
    - `/rest/api/latest/permissions` (GET)

---

- **Implemented all Application Properties Endpoints (`/rest/api/latest/application-properties`)**:

    - `/rest/api/latest/application-properties`(GET)
    - `/rest/api/latest/application-properties/{id}` (PUT)
    - `/rest/api/latest/application-properties/advanced-settings` (GET)

---

- **Implemented all Application Roles Endpoints (`/rest/api/latest/applicationrole`)**:

    - `/rest/api/latest/applicationrole` (GET, PUT)
    - `/rest/api/latest/applicationrole/{key}` (GET, PUT)

---

- **Implemented all Attachment Endpoints (`/rest/api/latest/attachment`)**:

    - `/rest/api/latest/attachment` 
    - `/rest/api/latest/attachment/{id}` (GET, DELETE)
    - `/rest/api/latest/attachment/meta` (GET)

---

- **Implemented all Avatar Endpoints (`/rest/api/latest/avatar`)**:

    - `/rest/api/latest/avatar/{type}/system` (GET)
    - `/rest/api/latest/avatar/{type}/temporary` (POST)
    - `/rest/api/latest/avatar/{type}/temporaryCrop` (POST)

---

- **Implemented all Component Endpoints (`/rest/api/latest/component`)**:

    - `/rest/api/latest/component` (POST)
    - `/rest/api/latest/component/{id}` (GET, PUT, DELETE)
    - `/rest/api/latest/component/{id}/relatedIssueCounts` (GET)

---

- **Implemented all Configuration Endpoints (`/rest/api/latest/configuration`)**:

    - `/rest/api/latest/configuration` (GET)

---

- **Implemented all Custom Field Options Endpoints (`/rest/api/latest/customFieldOption`)**:

    - `/rest/api/latest/customFieldOption/{id}` (GET)

---

- **Implemented all Custom Field Endpoints (`/rest/api/latest/customFields`)**:

    - `/rest/api/latest/customFields` (GET, DELETE)

---

- **Implemented all Dashboards Endpoints (`/rest/api/latest/dashboard`)**:

    - `/rest/api/latest/dashboard` (GET)
    - `/rest/api/latest/dashboard/{id}` (GET)

    ---

    - `/rest/api/latest/dashboard/{dashboardId}/items/{itemId}/properties` (GET)
    - `/rest/api/latest/dashboard/{dashboardId}/items/{itemId}/properties/{propertyKey}` (GET, PUT, DELETE)

---

- **Implemented all Email Templates Endpoints (`/rest/api/latest/email-templates`)**:

    - `/rest/api/latest/email-templates` (GET, POST)
    - `/rest/api/latest/email-templates/apply` (POST)
    - `/rest/api/latest/email-templates/revert` (POST)
    - `/rest/api/latest/email-templates/types` (GET)

---

- **Implemented all Field Endpoints (`/rest/api/latest/field`)**:

    - `/rest/api/latest/field` (GET, POST)

---

- **Implemented all Field Endpoints (`/rest/api/latest/filter`)**:

    - `/rest/api/latest/filter` (POST)
    - `/rest/api/latest/filter/{id}` (GET, PUT, DELETE)

    ---

    - `/rest/api/latest/filter/{id}/columns` (GET, PUT, DELETE)

    ---

    - `/rest/api/latest/filter/{id}/permission` (GET, POST)
    - `/rest/api/latest/filter/{id}/permission/{permission-id}` (GET, DELETE)

    ---

    - `/rest/api/latest/filter/defaultShareScope` (GET, PUT)

    ---

    - `/rest/api/latest/filter/favourite` (GET)

---

- **Implemented all Groups Endpoints (`/rest/api/latest/group`, `/rest/api/latest/groups/picker` and `/rest/api/latest/groupuserpicker`)**:

    - `/rest/api/latest/group` (POST, DELETE)

    ---

    - `/rest/api/latest/groups/member` (GET)
    - `/rest/api/latest/groups/user` (POST, DELETE)
    - `/rest/api/latest/groups/picker` (GET)

    ---

    - `/rest/api/latest/groupuserpicker` (GET)

---

- **Implemented all Issues Endpoints (`/rest/api/latest/issue` and `/rest/api/latest/search`)**:

    - `/rest/api/latest/issue/bulk` (POST)

    ---

    - `/rest/api/latest/issue/{issueIdOrKey}` (DELETE, PUT, GET)
    - `/rest/api/latest/issue/{issueIdOrKey}/archive` (PUT)
    - `/rest/api/latest/issue/{issueIdOrKey}/assignee` (PUT)
    - `/rest/api/latest/issue/{issueIdOrKey}/comment` (GET, POST)
    - `/rest/api/latest/issue/{issueIdOrKey}/comment/{commentId}` (GET, PUT, DELETE)
    - `/rest/api/latest/issue/{issueIdOrKey}/editmeta` (GET)
    - `/rest/api/latest/issue/{issueIdOrKey}/notify` (POST)
    - `/rest/api/latest/issue/{issueIdOrKey}/remotelink` (GET, POST, DELETE)
    - `/rest/api/latest/issue/{issueIdOrKey}/remotelink/{linkId}` (GET, PUT, DELETE)
    - `/rest/api/latest/issue/{issueIdOrKey}/restore` (PUT)
    - `/rest/api/latest/issue/{issueIdOrKey}/transitions` (GET, POST)
    - `/rest/api/latest/issue/{issueIdOrKey}/votes` (GET, POST, DELETE)
    - `/rest/api/latest/issue/{issueIdOrKey}/watchers` (GET, POST, DELETE)
    - `/rest/api/latest/issue/{issueIdOrKey}/worklog` (GET, POST)
    - `/rest/api/latest/issue/{issueIdOrKey}/worklog/{worklogId}` (GET, PUT, DELETE)
    - `/rest/api/latest/issue/{issueIdOrKey}/attachments` (POST)
    - `/rest/api/latest/issue/{issueIdOrKey}/subtask` (GET)

    ---

    - `/rest/api/latest/issue/createmeta/{projectIdOrKey}/issuetypes` (GET)
    - `/rest/api/latest/issue/createmeta/{projectIdOrKey}/issuetypes/{issueTypeId}` (GET)

    ---

    - `/rest/api/latest/issue/picker` (GET)

    ---

    - `/rest/api/latest/search` (POST)

---

- **Implemented all Issue Links Endpoints (`/rest/api/latest/issueLink` and `/rest/api/latest/groups/issueLinkType`)**:

    - `/rest/api/latest/issueLink` (POST)
    - `/rest/api/latest/issueLink/{linkId}` (GET, DELETE)

    ---

    - `/rest/api/latest/issueLinkType` (GET, POST)
    - `/rest/api/latest/issueLinkType/{issueLinkTypeId}` (GET, PUT, DELETE)


---

- **Implemented all Issue SecuritySchemes Endpoints (`/rest/api/latest/issuesecurityschemes`)**:

    - `/rest/api/latest/issuesecurityschemes` (GET)
    - `/rest/api/latest/issuesecurityschemes/{schemaId}` (GET)

---

- **Implemented all Issue Type Endpoints (`/rest/api/latest/issuetype`)**:

    - `/rest/api/latest/issuetype` (GET, POST)
    - `/rest/api/latest/issuetype/{issueTypeId}` (GET, PUT, DELETE)
    - `/rest/api/latest/issuetype/{issueTypeId}/alternatives` (GET)
    - `/rest/api/latest/issuetype/{issueTypeId}/avatar` (GET)
    - `/rest/api/latest/issuetype/{issueTypeId}/avatar/temporary` (POST)

---

- **Implemented all Issue Type Scheme Endpoints (`/rest/api/latest/issuetypescheme`)**:

    - `/rest/api/latest/issuetypescheme` (GET, POST)
    - `/rest/api/latest/issuetypescheme/{schemeId}` (GET, PUT, DELETE)
    - `/rest/api/latest/issuetypescheme/{schemeId}/associations` (GET, POST, PUT, DELETE)
    - `/rest/api/latest/issuetypescheme/{schemeId}/associations/{projectIdOrKey}` (DELETE)

---

- **Implemented all JQL Endpoints (`/rest/api/latest/jql`)**:

    - `/rest/api/latest/jql/autocompletedata` (GET)
    - `/rest/api/latest/jql/autocompletedata/suggestions` (GET)

---

- **Implemented all License Validator Endpoints (`/rest/api/latest/licenseValidator`)**:

    - `/rest/api/latest/licenseValidator` (POST)

---

- **Implemented all My Preferences Endpoints (`/rest/api/latest/mypreferences`)**:

    - `/rest/api/latest/mypreferences` (GET, PUT, DELETE)

---

- **Implemented all My Self Endpoints (`/rest/api/latest/myself`)**:

    - `/rest/api/latest/myself` (GET, PUT)
    - `/rest/api/latest/myself/password` (PUT)

---

- **Implemented all Notification Scheme Endpoints (`/rest/api/latest/notificationscheme`)**:

    - `/rest/api/latest/notificationscheme` (GET)
    - `/rest/api/latest/notificationscheme/{schemeId}` (GET)

---

- **Implemented all Password Endpoints (`/rest/api/latest/password`)**:

    - `/rest/api/latest/password/policy` (GET)
    - `/rest/api/latest/password/policy/createUser` (POST)
    - `/rest/api/latest/password/policy/updateUser` (POST)

---

- **Implemented all Permission Scheme Endpoints (`/rest/api/2/permissionscheme`)**:

    - `/rest/api/latest/permissionscheme` (GET, POST)
    - `/rest/api/latest/permissionscheme/{schemeId}` (GET, PUT, DELETE)
    - `/rest/api/latest/permissionscheme/{schemeId/permission` (GET, POST)
    - `/rest/api/latest/permissionscheme/{schemeId/permission/{permissionId}` (GET, DELETE)

---

- **Implemented all Priority Endpoints (`/rest/api/2/priority`)**:

    - `/rest/api/latest/priority` (GET)
    - `/rest/api/latest/priority/{priorityId}` (GET)

---

- **Implemented all Project Endpoints (`/rest/api/2/project`, `/rest/api/latest/projects/picker` and `/rest/api/latest/projectvalidate/key`)**:

    - `/rest/api/latest/project` (GET, PUT)
    - `/rest/api/latest/project/{projectIdOrKey}` (GET, PUT, DELETE)
    - `/rest/api/latest/project/{projectIdOrKey}/archive` (PUT)
    - `/rest/api/latest/project/{projectIdOrKey}/avatar` (POST, PUT)
    - `/rest/api/latest/project/{projectIdOrKey}/avatar/{avatarId}` (DELETE)
    - `/rest/api/latest/project/{projectIdOrKey}/avatar/temporary` (POST)
    - `/rest/api/latest/project/{projectIdOrKey}/avatars` (GET)
    - `/rest/api/latest/project/{projectIdOrKey}/components` (GET)
    - `/rest/api/latest/project/{projectIdOrKey}/restore` (PUT)
    - `/rest/api/latest/project/{projectIdOrKey}/statuses` (GET)
    - `/rest/api/latest/project/{projectIdOrKey}/statuses/type/{newProjectTypeKey}` (PUT)
    - `/rest/api/latest/project/{projectIdOrKey}/version` (GET)
    - `/rest/api/latest/project/{projectIdOrKey}/role` (GET)
    - `/rest/api/latest/project/{projectIdOrKey}/role/{roleId}` (GET, POST, PUT, DELETE)
    - `/rest/api/latest/project/{projectIdOrKey}/issuesecuritylevelscheme` (GET)
    - `/rest/api/latest/project/{projectIdOrKey}/notificationscheme` (GET)
    - `/rest/api/latest/project/{projectIdOrKey}/permissionscheme` (GET, PUT)
    - `/rest/api/latest/project/{projectIdOrKey}/securitylevel` (GET)
    - `/rest/api/latest/project/{projectIdOrKey}/workflowscheme` (GET)

    ---

    - `/rest/api/latest/projects/picker` (GET)

    ---

    `/rest/api/latest/projectvalidate/key` (GET)

---

- **Implemented all Project Category Endpoints (`/rest/api/2/projectCategory`)**:

    - `/rest/api/latest/projectCategory` (GET, POST)
    - `/rest/api/latest/projectCategory/{categoryId}` (GET, PUT, DELETE)

---

- **Implemented all Reindex Endpoints (`/rest/api/2/reindex`)**:

    - `/rest/api/latest/reindex` (GET, POST)
    - `/rest/api/latest/reindex/issue` (POST)
    - `/rest/api/latest/reindex/progress` (GET)
    - `/rest/api/latest/reindex/request/request` (POST)
    - `/rest/api/latest/reindex/request/{requestId}` (GET)
    - `/rest/api/latest/reindex/request/bulk` (GET)

---

- **Implemented all Resolutions Endpoints (`/rest/api/2/resolution`)**:

    - `/rest/api/latest/resolution/{resolutionId}` (GET)
    - `/rest/api/latest/resolution/page` (GET)

---

- **Implemented all Roles Endpoints (`/rest/api/2/role`)**:

    - `/rest/api/latest/role` (GET, POST)
    - `/rest/api/latest/role/{roleId}` (GET, POST, PUT, DELETE)
    - `/rest/api/latest/role/{roleId}/actors` (GET, POST, DELETE)

---

- **Implemented all Screens Endpoints (`/rest/api/2/screens`)**:

    - `/rest/api/latest/screens` (GET)
    - `/rest/api/latest/screens/{screenId}/availableFields` (GET)
    - `/rest/api/latest/screens/{screenId}/tabs` (GET, POST)
    - `/rest/api/latest/screens/{screenId}/tabs/{tabId}` (PUT, DELETE, POST)
    - `/rest/api/latest/screens/{screenId}/tabs/{tabId}/fields` (POST, GET)
    - `/rest/api/latest/screens/{screenId}/tabs/{tabId}/fields/{fieldId}` (DELETE)
    - `/rest/api/latest/screens/{screenId}/tabs/{tabId}/fields/{fieldId}/move` (POST)
    - `/rest/api/latest/screens/{screenId}/tabs/{tabId}/move/{pos}` (POST)
    - `/rest/api/latest/screens/addToDefault/{fieldId}` (POST)

---

- **Implemented all Security Levels Endpoints (`/rest/api/2/securitylevel`)**:

    - `/rest/api/latest/securitylevel/{levelId}` (GET)

---

- **Implemented all Statuses Endpoints (`/rest/api/2/status`)**:

    - `/rest/api/latest/status/{statusIdOrName}` (GET)
    - `/rest/api/latest/status/page` (GET)

---

- **Implemented all Status Categories Endpoints (`/rest/api/2/statuscategory`)**:

    - `/rest/api/latest/statuscategory` (GET)
    - `/rest/api/latest/statuscategory/{categoryIdOrKey}` (GET)

---

- **Implemented all Universal Avatars Endpoints (`/rest/api/2/universal_avatar`)**:

    - `/rest/api/latest/universal_avatar/type/{type}/owner/{owningObjectId}` (GET)
    - `/rest/api/latest/universal_avatar/type/{type}/owner/{owningObjectId}/avatar` (POST)
    - `/rest/api/latest/universal_avatar/type/{type}/owner/{owningObjectId}/avatar/{avatarId}` (DELETE)
    - `/rest/api/latest/universal_avatar/type/{type}/owner/{owningObjectId}/temp` (POST)

---

- **Implemented all Upgrade Endpoints (`/rest/api/2/upgrade`)**:

    - `/rest/api/latest/upgrade` (GET, POST)

---

- **Implemented all User Endpoints (`/rest/api/2/user`)**:

    - `/rest/api/latest/user` (GET, POST, PUT, DELETE)
    - `/rest/api/latest/user/application` (POST, DELETE)
    - `/rest/api/latest/assignable/multiProjectSearch` (GET)
    - `/rest/api/latest/assignable/search` (GET)
    - `/rest/api/latest/avatar` (POST, PUT)
    - `/rest/api/latest/avatar/temporary` (POST)
    - `/rest/api/latest/avatar/{avatarId}` (DELETE)
    - `/rest/api/latest/user/avatars` (GET)
    - `/rest/api/latest/user/columns` (GET, PUT, DELETE)
    - `/rest/api/latest/user/password` (PUT)
    - `/rest/api/latest/user/picker` (GET)
    - `/rest/api/latest/user/search` (GET)
    - `/rest/api/latest/user/a11y/personal-settings` (GET)
    - `/rest/api/latest/user/anonymization` (GET, POS)
    - `/rest/api/latest/user/anonymization/rerun` (GET, POST)
    - `/rest/api/latest/user/anonymization/progress` (GET)
    - `/rest/api/latest/user/anonymization/unlock` (DELETE)
    - `/rest/api/latest/user/properties` (GET)
    - `/rest/api/latest/user/properties/{propertyKey}` (GET, PUT, DELETE)

---

- **Implemented all Version Endpoints (`/rest/api/2/version`)**:

    - `/rest/api/latest/version` (GET, POST)
    - `/rest/api/latest/version/{versionId}` (GET, PUT, DELETE)
    - `/rest/api/latest/version/{versionId}/move` (POST)
    - `/rest/api/latest/version/{versionId}/mergeto/{moveIssuesTo}` (PUT)
    - `/rest/api/latest/version/{versionId}/relatedIssueCounts` (GET)
    - `/rest/api/latest/version/{versionId}/unresolvedIssueCount` (GET)
    - `/rest/api/latest/version/{versionId}/remotelink` (GET, DELETE)

---

- **Implemented all Workflow Endpoints (`/rest/api/2/workflow`)**:

    - `/rest/api/latest/workflow` (GET)
    - `/rest/api/latest/workflow/{workflowId}/properties` (GET, PUT, POST, DELETE)

---

- **Implemented all Workflow Endpoints (`/rest/api/2/workflowscheme`)**:

    - `/rest/api/latest/workflowscheme` (POST)
    - `/rest/api/latest/workflowscheme/{schemeId}` (GET, PUT, DELETE)
    - `/rest/api/latest/workflowscheme/{schemeId}/createdraft` (POST)
    - `/rest/api/latest/workflowscheme/{schemeId}/default` (GET, PUT, DELETE)
    - `/rest/api/latest/workflowscheme/{schemeId}/draft` (GET, PUT, DELETE)
    - `/rest/api/latest/workflowscheme/{schemeId}/draft/default` (GET, PUT, DELETE)
    - `/rest/api/latest/workflowscheme/{schemeId}/draft/issueType/{issueTypeId}` (GET, PUT, DELETE)
    - `/rest/api/latest/workflowscheme/{schemeId}/draft/workflow` (GET, PUT, DELETE)
    - `/rest/api/latest/workflowscheme/{schemeId}/issueType/{issueTypeId}` (GET, PUT, DELETE)
    - `/rest/api/latest/workflowscheme/{schemeId}/workflow` (GET, PUT, DELETE)

---

