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

- **Implemented all Groups Endpoints (`/rest/api/latest/group` `/rest/api/latest/groups/picker`, `/rest/api/latest/groupuserpicker`)**:

    - `/rest/api/latest/group` (POST, DELETE)

    ---

    - `/rest/api/latest/groups/member` (GET)

    ---

    - `/rest/api/latest/groups/user` (POST, DELETE)

    ---

    - `/rest/api/latest/groups/picker` (GET)

    ---

    - `/rest/api/latest/groupuserpicker` (GET)

---




