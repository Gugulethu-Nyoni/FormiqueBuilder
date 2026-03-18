class FormiqueBuilder {
  constructor(containerId = 'formique-builder', options = {}) {
    this.container = document.getElementById(containerId);
    if (!this.container) {
      console.error(`FormiqueBuilder: Container #${containerId} not found`);
      return;
    }

    // Options with defaults
    this.options = {
      showFormSettings: true, // visible by default
      ...options
    };

    // Form data model
    this.formData = {
      form: {
        id: "user-registration",
        settings: {
          theme: "light",
          themeColor: "#39a0ca",
          submitOnPage: false,
          submitMode: "email",
          sendTo: "",
          successMessage: "",
          errorMessage: "",
          requiredFieldIndicator: true,
          placeholders: true,
          formContainerId: "formique",
          formContainerStyle: ""
        },
        parameters: {
          method: "POST",
          action: "",
          id: "",
          class: "",
          style: "",
          enctype: "application/x-www-form-urlencoded",
          target: "_self",
          novalidate: false,
          accept_charset: "UTF-8"
        }
      },
      fields: []
    };

    // State variables
    this.currentInput = null;
    this.deletedField = null;
    this.currentModalType = 'text';
    this.currentOptionsField = null;

    // Form settings configuration
    this.formSettingsConfig = {
      "form_settings": {
        "theme": {
          "type": "select",
          "options": ["light", "dark", "blue", "dark-blue"],
          "default": "light",
          "description": "Overall form theme"
        },
        "themeColor": {
          "type": "color", 
          "default": "#39a0ca",
          "description": "Custom theme color"
        },
        "submitOnPage": {
          "type": "checkbox",
          "default": false,
          "description": "Submit without page navigation"
        },
        "submitMode": {
          "type": "select",
          "options": ["email", "rsvp"],
          "default": "email",
          "description": "How to handle form submission"
        },
        "sendTo": {
          "type": "text",
          "default": "",
          "description": "Comma-separated recipient emails"
        },
        "successMessage": {
          "type": "text",
          "default": "",
          "description": "Custom success message"
        },
        "errorMessage": {
          "type": "text", 
          "default": "",
          "description": "Custom error message"
        },
        "requiredFieldIndicator": {
          "type": "checkbox",
          "default": true,
          "description": "Show asterisk for required fields"
        },
        "placeholders": {
          "type": "checkbox",
          "default": true,
          "description": "Use labels as placeholders"
        },
        "formContainerId": {
          "type": "text",
          "default": "formique",
          "description": "ID of form wrapper container"
        },
        "formContainerStyle": {
          "type": "text",
          "default": "",
          "description": "Inline CSS for form container"
        }
      },
      "form_parameters": {
        "method": {
          "type": "select",
          "options": ["POST", "GET", "PUT", "DELETE", "PATCH"],
          "default": "POST",
          "description": "HTTP method for form submission"
        },
        "action": {
          "type": "text", 
          "default": "",
          "description": "URL where form data is sent"
        },
        "id": {
          "type": "text",
          "default": "",
          "description": "Form element ID"
        },
        "class": {
          "type": "text",
          "default": "",
          "description": "Form element CSS classes"
        },
        "style": {
          "type": "text",
          "default": "",
          "description": "Form element inline styles"
        },
        "enctype": {
          "type": "select",
          "options": ["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"],
          "default": "application/x-www-form-urlencoded",
          "description": "Form data encoding type"
        },
        "target": {
          "type": "select", 
          "options": ["_self", "_blank", "_parent", "_top"],
          "default": "_self",
          "description": "Where to display form response"
        },
        "novalidate": {
          "type": "checkbox",
          "default": false,
          "description": "Disable browser validation"
        },
        "accept_charset": {
          "type": "text",
          "default": "UTF-8",
          "description": "Character encoding for form"
        }
      }
    };

    // Form input types configuration
    this.formConfig = {
      "form_input_types": {
        "text": {
          "display_name": "Text",
          "description": "For single-line text input",
          "html_type": "text",
          "icon": "fas fa-font",
          "preview": '<input type="text" placeholder="Enter text" class="preview-input">',
          "validation": {
            "minlength": 0,
            "maxlength": 255,
            "pattern": null,
            "required": false,
            "custom_patterns": {
              "alphanumeric": "^[a-zA-Z0-9 ]*$",
              "letters_only": "^[a-zA-Z ]*$",
              "no_special_chars": "^[a-zA-Z0-9 ]*$"
            }
          }
        },
        "email": {
          "display_name": "Email",
          "description": "For email addresses with built-in validation",
          "html_type": "email",
          "icon": "fas fa-envelope",
          "preview": '<input type="email" placeholder="Enter your email" class="preview-input">',
          "validation": {
            "required": false,
            "pattern": "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
          }
        },
        "number": {
          "display_name": "Number",
          "description": "For numeric values",
          "html_type": "number",
          "icon": "fas fa-hashtag",
          "preview": '<input type="number" placeholder="Enter a number" class="preview-input">',
          "validation": {
            "min": null,
            "max": null,
            "required": false,
            "step": 1
          }
        },
        "password": {
          "display_name": "Password",
          "description": "For password input with masking",
          "html_type": "password",
          "icon": "fas fa-lock",
          "preview": '<input type="password" placeholder="Enter password" class="preview-input">',
          "validation": {
            "minlength": 8,
            "maxlength": 128,
            "required": false,
            "pattern": null
          }
        },
        "tel": {
          "display_name": "Telephone",
          "description": "For telephone numbers",
          "html_type": "tel",
          "icon": "fas fa-phone",
          "preview": '<input type="tel" placeholder="Enter phone number" class="preview-input">',
          "validation": {
            "required": false,
            "pattern": null,
            "minlength": 0,
            "maxlength": 20
          }
        },
        "date": {
          "display_name": "Date",
          "description": "For selecting a date",
          "html_type": "date",
          "icon": "fas fa-calendar",
          "preview": '<input type="date" class="preview-input">',
          "validation": {
            "required": false,
            "min": null,
            "max": null
          }
        },
        "time": {
          "display_name": "Time",
          "description": "For selecting a time",
          "html_type": "time",
          "icon": "fas fa-clock",
          "preview": '<input type="time" class="preview-input">',
          "validation": {
            "required": false,
            "min": null,
            "max": null,
            "step": 60
          }
        },
        "datetime-local": {
          "display_name": "Date & Time",
          "description": "For selecting both date and time",
          "html_type": "datetime-local",
          "icon": "fas fa-calendar-alt",
          "preview": '<input type="datetime-local" class="preview-input">',
          "validation": {
            "required": false,
            "min": null,
            "max": null
          }
        },
        "month": {
          "display_name": "Month",
          "description": "For selecting a month and year",
          "html_type": "month",
          "icon": "fas fa-calendar-week",
          "preview": '<input type="month" class="preview-input">',
          "validation": {
            "required": false,
            "min": null,
            "max": null
          }
        },
        "week": {
          "display_name": "Week",
          "description": "For selecting a week",
          "html_type": "week",
          "icon": "fas fa-calendar-week",
          "preview": '<input type="week" class="preview-input">',
          "validation": {
            "required": false,
            "min": null,
            "max": null
          }
        },
        "url": {
          "display_name": "URL",
          "description": "For website URLs",
          "html_type": "url",
          "icon": "fas fa-link",
          "preview": '<input type="url" placeholder="Enter URL" class="preview-input">',
          "validation": {
            "required": false,
            "pattern": "https?://.+"
          }
        },
        "search": {
          "display_name": "Search",
          "description": "For search queries",
          "html_type": "search",
          "icon": "fas fa-search",
          "preview": '<input type="search" placeholder="Search..." class="preview-input">',
          "validation": {
            "minlength": 0,
            "maxlength": 255,
            "required": false
          }
        },
        "color": {
          "display_name": "Color",
          "description": "For color selection",
          "html_type": "color",
          "icon": "fas fa-palette",
          "preview": '<input type="color" class="preview-input">',
          "validation": {
            "required": false
          }
        },
        "file": {
          "display_name": "File Upload",
          "description": "For file uploads",
          "html_type": "file",
          "icon": "fas fa-file-upload",
          "preview": '<input type="file" class="preview-input">',
          "validation": {
            "required": false,
            "accept": "",
            "multiple": false
          }
        },
        "hidden": {
          "display_name": "Hidden Field",
          "description": "Hidden input for storing data",
          "html_type": "hidden",
          "icon": "fas fa-eye-slash",
          "preview": '<input type="hidden" class="preview-input">',
          "validation": {
            "required": false
          }
        },
        "image": {
          "display_name": "Image Upload",
          "description": "For image file uploads",
          "html_type": "image",
          "icon": "fas fa-image",
          "preview": '<input type="image" src="" alt="Submit" class="preview-input">',
          "validation": {
            "required": false,
            "accept": "image/*"
          }
        },
        "textarea": {
          "display_name": "Text Area",
          "description": "For multi-line text input",
          "html_type": "textarea",
          "icon": "fas fa-align-left",
          "preview": '<textarea placeholder="Enter text" class="preview-input" rows="4"></textarea>',
          "validation": {
            "minlength": 0,
            "maxlength": 5000,
            "required": false,
            "rows": 4,
            "cols": 50
          }
        },
        "radio": {
          "display_name": "Radio Buttons",
          "description": "Single selection from multiple options",
          "html_type": "radio",
          "icon": "fas fa-dot-circle",
          "preview": '<div><label><input type="radio" name="radio_group"> Option 1</label><br><label><input type="radio" name="radio_group"> Option 2</label></div>',
          "validation": {
            "required": false,
            "options": ["Option 1", "Option 2"]
          }
        },
        "checkbox": {
          "display_name": "Checkbox",
          "description": "Multiple selection from options",
          "html_type": "checkbox",
          "icon": "fas fa-check-square",
          "preview": '<div><label><input type="checkbox"> Option 1</label><br><label><input type="checkbox"> Option 2</label></div>',
          "validation": {
            "required": false,
            "options": ["Option 1", "Option 2"]
          }
        },
        "singleSelect": {
          "display_name": "Single Select",
          "description": "Dropdown for single selection",
          "html_type": "select",
          "icon": "fas fa-list",
          "preview": '<select class="preview-input"><option value="">Select an option</option><option>Option 1</option><option>Option 2</option></select>',
          "validation": {
            "required": false,
            "options": ["Option 1", "Option 2"]
          }
        },
        "dynamicSingleSelect": {
          "display_name": "Dynamic Select",
          "description": "Cascading dropdown (e.g., Country-State)",
          "html_type": "select",
          "icon": "fas fa-sitemap",
          "preview": '<select class="preview-input"><option>Parent → Child</option></select>',
          "validation": {
            "required": false,
            "options": [],
            "dynamic_options": {}
          }
        },
        "multipleSelect": {
          "display_name": "Multiple Select",
          "description": "Dropdown for multiple selections",
          "html_type": "select",
          "icon": "fas fa-list-ol",
          "preview": '<select multiple class="preview-input"><option>Option 1</option><option>Option 2</option><option>Option 3</option></select>',
          "validation": {
            "required": false,
            "options": ["Option 1", "Option 2", "Option 3"]
          }
        },
        "submit": {
          "display_name": "Submit Button",
          "description": "Form submission button",
          "html_type": "submit",
          "icon": "fas fa-paper-plane",
          "preview": '<button type="submit" class="preview-input btn-primary">Submit</button>',
          "validation": {
            "required": false
          }
        }
      },
      "universal_attributes": {
        "common": {
          "required": false,
          "disabled": false,
          "readonly": false,
          "placeholder": "",
          "help_text": "",
          "label": "",
          "name": "",
          "id": "",
          "class": "",
          "style": "",
          "value": ""
        },
        "accessibility": {
          "aria_label": "",
          "aria_describedby": "",
          "aria_required": false,
          "aria_invalid": false,
          "tab_index": 0,
          "role": ""
        },
        "behavior": {
          "autofocus": false,
          "autocomplete": "on",
          "visibility": {
            "hidden": false,
            "conditional_display": false
          }
        },
        "styling": {
          "width": "100%",
          "responsive": true,
          "custom_css": "",
          "size": "medium",
          "variant": "default"
        },
        "data": {
          "default_value": "",
          "data_source": null,
          "validation_message": "Please complete this field correctly",
          "success_message": "",
          "data_binding": null
        },
        "events": {
          "on_change": "",
          "on_focus": "",
          "on_blur": "",
          "on_input": "",
          "on_click": ""
        }
      }
    };

    this.init();
  }

  init() {
    // Insert the HTML template into container
    this.container.innerHTML = this.getTemplate();
    
    // Cache DOM elements
    this.cacheElements();
    
    // Initialize
    this.populateElementModal();
    this.populateElementDropdown();
    this.generateFormSettings();
    this.renderFormPreview();
    this.updateFormiqueOutput();
    this.attachEvents();
  }

  getTemplate() {
    // Conditionally include form settings panel
    const formSettingsHtml = this.options.showFormSettings ? `
      <div class="form-settings-panel">
        <div class="settings-header">
          <h3>Form Settings</h3>
          <button class="settings-toggle" id="settingsToggle"><i class="fas fa-chevron-up"></i> Hide Settings</button>
        </div>

        <div class="settings-content active" id="settingsContent">
          <div class="settings-group">
            <label class="settings-label">Form ID</label>
            <input type="text" class="settings-input" id="formId" value="user-registration">
          </div>

          <div class="option-group">
            <div class="accordion-header" id="formSettingsHeader">
              <div class="accordion-title">Form Settings</div>
              <div class="accordion-icon"><i class="fas fa-chevron-down"></i></div>
            </div>
            <div class="accordion-content" id="formSettingsContent">
              <div id="formSettingsFields"></div>
            </div>
          </div>

          <div class="option-group">
            <div class="accordion-header" id="formParamsHeader">
              <div class="accordion-title">Form Parameters</div>
              <div class="accordion-icon"><i class="fas fa-chevron-down"></i></div>
            </div>
            <div class="accordion-content" id="formParamsContent">
              <div id="formParamsFields"></div>
            </div>
          </div>
        </div>
      </div>
    ` : '';

    return `
      ${formSettingsHtml}

      <div class="builder-container">
        <div class="form-preview" id="formPreview">
          <div class="empty-state" id="emptyState">
            <i class="fas fa-file-alt"></i>
            <h3>Start building your form</h3>
            <p>Add your first field to get started</p>
          </div>
        </div>

        <div class="output-panel">
          <div class="output-header">
            <h3>Formique Output</h3>
            <div class="output-actions">
              <button class="copy-btn" id="copyOutput">
                <i class="fas fa-copy"></i> Copy
              </button>
              <button class="submit-btn" id="submitForm">
                <i class="fas fa-paper-plane"></i> Submit
              </button>
            </div>
          </div>
          <textarea id="formiqueOutput">@form: user-registration
  - field-name</textarea>
        </div>
      </div>

      <div class="dropdown" id="elementDropdown"></div>

      <div class="modal-overlay" id="modalOverlay">
        <div class="modal">
          <div class="modal-sidebar">
            <ul class="element-list" id="elementList"></ul>
          </div>
          <div class="modal-content">
            <h3 id="modalTitle">Text</h3>
            <p class="element-description" id="modalDescription">
              For single-line text input
            </p>
            
            <div class="element-preview">
              <div class="preview-label">Example Preview</div>
              <div id="modalPreview"></div>
            </div>

            <div class="modal-actions">
              <button class="btn btn-primary" id="insertElement">Insert Element</button>
              <button class="btn btn-outline" id="closeModal">Cancel</button>
            </div>
          </div>
        </div>
      </div>

      <div class="options-modal" id="optionsModal">
        <div class="modal-header">
          <h4 id="optionsModalTitle">Field Options</h4>
          <div class="modal-actions">
            <button class="btn btn-primary" id="saveOptions">Save</button>
            <button class="close-modal" id="closeOptions">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
        <div id="optionsModalContent"></div>
      </div>

      <div class="toast" id="toast">
        <span>Field deleted</span>
        <button class="toast-undo" id="undoDelete">Undo</button>
      </div>
    `;
  }

  cacheElements() {
    this.elements = {
      preview: this.container.querySelector('#formPreview'),
      output: this.container.querySelector('#formiqueOutput'),
      emptyState: this.container.querySelector('#emptyState'),
      settingsToggle: this.container.querySelector('#settingsToggle'),
      settingsContent: this.container.querySelector('#settingsContent'),
      formId: this.container.querySelector('#formId'),
      copyBtn: this.container.querySelector('#copyOutput'),
      submitBtn: this.container.querySelector('#submitForm'),
      modalOverlay: this.container.querySelector('#modalOverlay'),
      optionsModal: this.container.querySelector('#optionsModal'),
      toast: this.container.querySelector('#toast'),
      undoBtn: this.container.querySelector('#undoDelete'),
      elementList: this.container.querySelector('#elementList'),
      elementDropdown: this.container.querySelector('#elementDropdown'),
      modalTitle: this.container.querySelector('#modalTitle'),
      modalDescription: this.container.querySelector('#modalDescription'),
      modalPreview: this.container.querySelector('#modalPreview'),
      insertElement: this.container.querySelector('#insertElement'),
      closeModal: this.container.querySelector('#closeModal'),
      optionsModalTitle: this.container.querySelector('#optionsModalTitle'),
      optionsModalContent: this.container.querySelector('#optionsModalContent'),
      closeOptions: this.container.querySelector('#closeOptions'),
      saveOptions: this.container.querySelector('#saveOptions'),
      formSettingsFields: this.container.querySelector('#formSettingsFields'),
      formParamsFields: this.container.querySelector('#formParamsFields'),
      formSettingsHeader: this.container.querySelector('#formSettingsHeader'),
      formParamsHeader: this.container.querySelector('#formParamsHeader'),
      formSettingsContent: this.container.querySelector('#formSettingsContent'),
      formParamsContent: this.container.querySelector('#formParamsContent')
    };
  }

  attachEvents() {
    // Only attach settings events if panel exists
    if (this.elements.settingsToggle) {
      this.elements.settingsToggle.addEventListener('click', () => {
        const isActive = this.elements.settingsContent.classList.toggle('active');
        this.elements.settingsToggle.innerHTML = isActive ? 
          '<i class="fas fa-chevron-up"></i> Hide Settings' : 
          '<i class="fas fa-chevron-down"></i> Show Settings';
      });
    }

    // Copy button
    this.elements.copyBtn.addEventListener('click', () => {
      this.elements.output.select();
      document.execCommand('copy');
      
      const original = this.elements.copyBtn.innerHTML;
      this.elements.copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
      setTimeout(() => {
        this.elements.copyBtn.innerHTML = original;
      }, 2000);
    });

    // Submit button
    this.elements.submitBtn.addEventListener('click', () => {
      const output = this.elements.output.value;
      console.log('Formique Output:', output);
      alert('Form submitted! Check console.');
    });

    // Undo button
    this.elements.undoBtn.addEventListener('click', () => {
      if (this.deletedField) {
        this.formData.fields.splice(this.deletedField.index, 0, this.deletedField.field);
        this.renderFormPreview();
        this.updateFormiqueOutput();
        this.elements.toast.classList.remove('active');
        this.deletedField = null;
      }
    });

    // Modal close
    this.elements.closeModal.addEventListener('click', () => {
      this.hideModal();
    });

    // Options modal close
    this.elements.closeOptions.addEventListener('click', () => {
      this.hideOptionsModal();
    });

    // Save options
    this.elements.saveOptions.addEventListener('click', () => {
      this.saveOptions();
    });

    // Insert element
    this.elements.insertElement.addEventListener('click', () => {
      if (this.currentInput !== null) {
        this.addFormBlock(this.currentModalType, this.currentInput + 1);
        this.hideModal();
      }
    });

    // Form ID input
    if (this.elements.formId) {
      this.elements.formId.addEventListener('input', (e) => {
        this.formData.form.id = e.target.value;
        this.updateFormiqueOutput();
      });
    }

    // Element list click
    this.elements.elementList.addEventListener('click', (e) => {
      const item = e.target.closest('.element-item');
      if (item) {
        this.container.querySelectorAll('.element-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        this.setActiveElement(item.dataset.type);
      }
    });

    // Document click
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.dropdown') && !e.target.matches('.input-main')) {
        this.hideAllDropdowns();
      }
      
      if (!e.target.closest('.modal') && e.target.closest('.modal-overlay')) {
        this.hideModal();
      }
      
      if (!e.target.closest('.options-modal') && !e.target.closest('.options-btn')) {
        this.hideOptionsModal();
      }
    });

    // Settings accordions - only if they exist
    if (this.elements.formSettingsHeader) {
      this.elements.formSettingsHeader.addEventListener('click', () => {
        const isActive = this.elements.formSettingsHeader.classList.toggle('active');
        this.elements.formSettingsContent.classList.toggle('active', isActive);
        const icon = this.elements.formSettingsHeader.querySelector('.accordion-icon i');
        icon.className = isActive ? 'fas fa-chevron-up' : 'fas fa-chevron-down';
      });
    }
    
    if (this.elements.formParamsHeader) {
      this.elements.formParamsHeader.addEventListener('click', () => {
        const isActive = this.elements.formParamsHeader.classList.toggle('active');
        this.elements.formParamsContent.classList.toggle('active', isActive);
        const icon = this.elements.formParamsHeader.querySelector('.accordion-icon i');
        icon.className = isActive ? 'fas fa-chevron-up' : 'fas fa-chevron-down';
      });
    }
  }

  populateElementModal() {
    if (!this.elements.elementList) return;
    
    this.elements.elementList.innerHTML = '';
    
    Object.entries(this.formConfig.form_input_types).forEach(([key, config]) => {
      const li = document.createElement('li');
      li.className = `element-item ${key === 'text' ? 'active' : ''}`;
      li.dataset.type = key;
      
      li.innerHTML = `
        <div class="element-icon"><i class="${config.icon}"></i></div>
        <div class="element-name">${config.display_name}</div>
      `;
      
      this.elements.elementList.appendChild(li);
    });
  }

  populateElementDropdown() {
    if (!this.elements.elementDropdown) return;
    
    this.elements.elementDropdown.innerHTML = '';
    
    Object.entries(this.formConfig.form_input_types).forEach(([key, config]) => {
      const item = document.createElement('div');
      item.className = 'dropdown-item';
      item.dataset.type = key;
      
      item.innerHTML = `
        <div class="dropdown-icon"><i class="${config.icon}"></i></div>
        <div class="dropdown-name">${config.display_name}</div>
      `;
      
      this.elements.elementDropdown.appendChild(item);
    });
  }

  generateFormSettings() {
    // Skip if settings panels don't exist
    if (!this.elements.formSettingsFields || !this.elements.formParamsFields) return;
    
    const settingsContainer = this.elements.formSettingsFields;
    const paramsContainer = this.elements.formParamsFields;
    
    settingsContainer.innerHTML = '';
    paramsContainer.innerHTML = '';
    
    // Generate Form Settings
    Object.keys(this.formSettingsConfig.form_settings).forEach(setting => {
      const config = this.formSettingsConfig.form_settings[setting];
      const currentValue = this.formData.form.settings[setting];
      
      let inputField = '';
      
      switch(config.type) {
        case 'select':
          inputField = `
            <select class="settings-input form-setting" data-setting="${setting}">
              ${config.options.map(opt => 
                `<option value="${opt}" ${currentValue === opt ? 'selected' : ''}>${opt}</option>`
              ).join('')}
            </select>
          `;
          break;
        case 'checkbox':
          inputField = `
            <label class="checkbox-label">
              <input type="checkbox" class="form-setting" data-setting="${setting}" ${currentValue ? 'checked' : ''}>
              <span>${config.description}</span>
            </label>
          `;
          break;
        case 'color':
          inputField = `
            <div class="color-input-container">
              <input type="color" class="settings-input form-setting" data-setting="${setting}" value="${currentValue}">
              <div class="color-preview" style="background-color: ${currentValue};"></div>
            </div>
          `;
          break;
        default:
          inputField = `
            <input type="text" class="settings-input form-setting" data-setting="${setting}" 
                   value="${currentValue}" placeholder="${config.default}">
          `;
      }
      
      const group = document.createElement('div');
      group.className = 'settings-group';
      group.innerHTML = `
        <label class="settings-label">${setting.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</label>
        ${inputField}
        <div class="settings-description">${config.description}</div>
      `;
      
      settingsContainer.appendChild(group);
    });
    
    // Generate Form Parameters
    Object.keys(this.formSettingsConfig.form_parameters).forEach(param => {
      const config = this.formSettingsConfig.form_parameters[param];
      const currentValue = this.formData.form.parameters[param];
      
      let inputField = '';
      
      if (config.type === 'select') {
        inputField = `
          <select class="settings-input form-param" data-param="${param}">
            ${config.options.map(opt => 
              `<option value="${opt}" ${currentValue === opt ? 'selected' : ''}>${opt}</option>`
            ).join('')}
          </select>
        `;
      } else if (config.type === 'checkbox') {
        inputField = `
          <label class="checkbox-label">
            <input type="checkbox" class="form-param" data-param="${param}" ${currentValue ? 'checked' : ''}>
            <span>${config.description}</span>
          </label>
        `;
      } else {
        inputField = `
          <input type="text" class="settings-input form-param" data-param="${param}" 
                 value="${currentValue}" placeholder="${config.default}">
        `;
      }
      
      const group = document.createElement('div');
      group.className = 'settings-group';
      group.innerHTML = `
        <label class="settings-label">${param.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</label>
        ${inputField}
        <div class="settings-description">${config.description}</div>
      `;
      
      paramsContainer.appendChild(group);
    });
    
    // Add event listeners
    this.container.querySelectorAll('.form-setting').forEach(input => {
      input.addEventListener('change', (e) => {
        const setting = e.target.dataset.setting;
        let value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        this.formData.form.settings[setting] = value;
        this.updateFormiqueOutput();
      });
    });
    
    this.container.querySelectorAll('.form-param').forEach(input => {
      input.addEventListener('change', (e) => {
        const param = e.target.dataset.param;
        let value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        this.formData.form.parameters[param] = value;
        this.updateFormiqueOutput();
      });
    });
  }

  addFormBlock(type = null, index = null) {
    const blockId = Date.now().toString();
    const fieldName = type ? this.generateFieldName(type) : 'field-name';
    
    const field = {
      id: blockId,
      type: type || 'text',
      name: fieldName,
      label: '',
      required: false,
      placeholder: type ? '' : 'type @ to enter input',
      attributes: {
        required: false,
        placeholder: '',
        help_text: '',
        label: '',
        name: fieldName,
        id: '',
        class: '',
        style: '',
        value: '',
        validation: {}
      }
    };

    if (index !== null) {
      this.formData.fields.splice(index, 0, field);
    } else {
      this.formData.fields.push(field);
    }

    this.renderFormPreview();
    this.updateFormiqueOutput();
    
    if (this.elements.emptyState.style.display !== 'none') {
      this.elements.emptyState.style.display = 'none';
    }
  }

  generateFieldName(type) {
    const names = {
      text: 'full-name',
      email: 'email-address',
      number: 'quantity',
      password: 'password',
      tel: 'phone-number',
      date: 'birth-date',
      time: 'appointment-time',
      'datetime-local': 'event-datetime',
      month: 'start-month',
      week: 'project-week',
      url: 'website-url',
      search: 'search-query',
      color: 'favorite-color',
      file: 'document-upload',
      hidden: 'hidden-data',
      image: 'profile-image',
      textarea: 'message',
      radio: 'preference',
      checkbox: 'interests',
      singleSelect: 'category',
      multipleSelect: 'skills',
      dynamicSingleSelect: 'Country-State',
      submit: 'submit-button'
    };
    return names[type] || 'field-name';
  }

  renderFormPreview() {
    if (!this.elements.preview) return;
    
    this.elements.preview.innerHTML = '';
    
    if (this.formData.fields.length === 0) {
      this.elements.emptyState.style.display = 'block';
      const addBlockDiv = document.createElement('div');
      addBlockDiv.className = 'add-block-center';
      addBlockDiv.innerHTML = `<button class="add-block-btn" id="addBlockCenter"><i class="fas fa-plus"></i></button>`;
      this.elements.preview.appendChild(addBlockDiv);
      
      addBlockDiv.querySelector('#addBlockCenter').addEventListener('click', () => {
        this.addFormBlock();
      });
      return;
    }
    
    this.elements.emptyState.style.display = 'none';
    
    this.formData.fields.forEach((field, index) => {
      const block = document.createElement('div');
      block.className = 'form-block';
      block.dataset.id = field.id;
      
      const config = this.formConfig.form_input_types[field.type] || this.formConfig.form_input_types.text;
      
      const fieldNameDisplay = field.required ? `${field.name}*` : field.name;
      
      block.innerHTML = `
        <div class="drag-handle">
          <i class="fas fa-grip-vertical"></i>
        </div>
        <button class="add-element-btn" data-index="${index}">
          <i class="fas fa-plus"></i>
        </button>
        <div class="input-area">
          <input type="text" class="input-main" placeholder=" " value="${fieldNameDisplay}">
          <div class="placeholder-text">${field.placeholder || ''}</div>
          <div class="dropdown">
            ${Object.entries(this.formConfig.form_input_types).map(([key, config]) => `
              <div class="dropdown-item" data-type="${key}">
                <div class="dropdown-icon"><i class="${config.icon}"></i></div>
                <div class="dropdown-name">${config.display_name}</div>
              </div>
            `).join('')}
          </div>
        </div>
        <div class="block-controls">
          <label class="required-toggle">
            <input type="checkbox" ${field.required ? 'checked' : ''}>
            <span>Required </span>
          </label>
          <button class="control-btn options-btn">
            <i class="fas fa-cog"></i>
          </button>
          <button class="control-btn delete-btn">
            <i class="fas fa-trash"></i>
          </button>
          <div class="type-indicator">
            <i class="${config.icon}"></i>
          </div>
        </div>
      `;
      
      this.elements.preview.appendChild(block);
      
      const input = block.querySelector('.input-main');
      const dropdown = block.querySelector('.dropdown');
      const addBtn = block.querySelector('.add-element-btn');
      const deleteBtn = block.querySelector('.delete-btn');
      const optionsBtn = block.querySelector('.options-btn');
      const requiredToggle = block.querySelector('input[type="checkbox"]');
      
      input.addEventListener('focus', () => {
        block.classList.add('selected');
      });
      
      input.addEventListener('blur', () => {
        block.classList.remove('selected');
        const nameWithoutAsterisk = input.value.replace(/\*$/, '');
        this.updateFieldName(field.id, nameWithoutAsterisk);
      });
      
      input.addEventListener('input', (e) => {
        if (e.data === '@') {
          this.showDropdown(dropdown, field.id);
        } else {
          this.hideDropdown(dropdown);
        }
      });
      
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          this.addFormBlock(null, index + 1);
          setTimeout(() => {
            const newBlock = this.elements.preview.children[index + 1];
            if (newBlock) {
              const newInput = newBlock.querySelector('.input-main');
              newInput.focus();
            }
          }, 10);
        }
      });
      
      addBtn.addEventListener('click', () => {
        this.showModal(index);
      });
      
      deleteBtn.addEventListener('click', () => {
        this.deleteField(field.id, index);
      });
      
      optionsBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.showOptionsModal(field.id, block);
      });
      
      requiredToggle.addEventListener('change', () => {
        this.updateFieldRequired(field.id, requiredToggle.checked);
        const newValue = requiredToggle.checked ? `${field.name}*` : field.name;
        input.value = newValue;
      });
    });
    
    const addBlockDiv = document.createElement('div');
    addBlockDiv.className = 'add-block-center';
    addBlockDiv.innerHTML = `<button class="add-block-btn" id="addBlockCenter"><i class="fas fa-plus"></i></button>`;
    this.elements.preview.appendChild(addBlockDiv);
    
    addBlockDiv.querySelector('#addBlockCenter').addEventListener('click', () => {
      this.addFormBlock();
    });
    
    this.container.querySelectorAll('.dropdown-item').forEach(item => {
      item.addEventListener('click', () => {
        const type = item.dataset.type;
        const fieldId = item.closest('.form-block')?.dataset.id;
        if (fieldId) {
          this.updateFieldType(fieldId, type);
          this.hideAllDropdowns();
        }
      });
    });
  }

  showDropdown(dropdown, fieldId) {
    this.hideAllDropdowns();
    dropdown.classList.add('active');
    this.currentInput = fieldId;
  }

  hideDropdown(dropdown) {
    if (dropdown) {
      dropdown.classList.remove('active');
    }
  }

  hideAllDropdowns() {
    this.container.querySelectorAll('.dropdown').forEach(dropdown => {
      dropdown.classList.remove('active');
    });
  }

  showModal(index) {
    this.elements.modalOverlay.classList.add('active');
    this.currentInput = index;
    
    const firstItem = this.container.querySelector('.element-item');
    if (firstItem) {
      this.setActiveElement(firstItem.dataset.type);
    }
  }

  hideModal() {
    this.elements.modalOverlay.classList.remove('active');
  }

  showOptionsModal(fieldId, block) {
    const field = this.formData.fields.find(f => f.id === fieldId);
    if (!field) return;

    this.currentOptionsField = fieldId;
    
    const rect = block.getBoundingClientRect();
    this.elements.optionsModal.style.top = (rect.bottom + 10) + 'px';
    this.elements.optionsModal.style.left = (rect.left) + 'px';
    
    const fieldConfig = this.formConfig.form_input_types[field.type];
    this.elements.optionsModalTitle.textContent = `${fieldConfig.display_name} Options`;
    
    this.generateOptionsContent(field);
    
    this.elements.optionsModal.classList.add('active');
    
    this.makeDraggable(this.elements.optionsModal);
  }

  hideOptionsModal() {
    this.elements.optionsModal.classList.remove('active');
    this.currentOptionsField = null;
  }

  makeDraggable(element) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    const header = element.querySelector('.modal-header');
    
    header.onmousedown = (e) => {
      e.preventDefault();
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = () => {
        document.onmouseup = null;
        document.onmousemove = null;
      };
      document.onmousemove = (e) => {
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
      };
    };
  }

  setActiveElement(type) {
    this.currentModalType = type;
    const config = this.formConfig.form_input_types[type];
    
    if (config) {
      this.elements.modalTitle.textContent = config.display_name;
      this.elements.modalDescription.textContent = config.description;
      this.elements.modalPreview.innerHTML = config.preview;
    }
  }

  updateFieldName(fieldId, name) {
    const field = this.formData.fields.find(f => f.id === fieldId);
    if (field) {
      field.name = name;
      field.attributes.name = name;
      
      if (name.includes('-') && name !== 'datetime-local' && field.type !== 'dynamicSingleSelect') {
        field.type = 'dynamicSingleSelect';
        field.attributes.validation = { options: [], dynamic_options: {} };
      }
      
      this.updateFormiqueOutput();
    }
  }

  updateFieldType(fieldId, type) {
    const field = this.formData.fields.find(f => f.id === fieldId);
    if (field) {
      field.type = type;
      field.name = this.generateFieldName(type);
      const config = this.formConfig.form_input_types[type];
      field.placeholder = `Enter ${config.display_name.toLowerCase()}`;
      
      field.attributes = {
        required: field.required,
        placeholder: '',
        help_text: '',
        label: field.label,
        name: field.name,
        id: '',
        validation: {}
      };
      
      this.renderFormPreview();
      this.updateFormiqueOutput();
    }
  }

  updateFieldRequired(fieldId, required) {
    const field = this.formData.fields.find(f => f.id === fieldId);
    if (field) {
      field.required = required;
      field.attributes.required = required;
      this.updateFormiqueOutput();
    }
  }

  deleteField(fieldId, index) {
    this.deletedField = {
      field: this.formData.fields.splice(index, 1)[0],
      index: index
    };
    this.renderFormPreview();
    this.updateFormiqueOutput();
    
    this.elements.toast.classList.add('active');
    setTimeout(() => {
      this.elements.toast.classList.remove('active');
      this.deletedField = null;
    }, 5000);
  }

  generateOptionsContent(field) {
  const fieldConfig = this.formConfig.form_input_types[field.type];
  this.elements.optionsModalContent.innerHTML = '';
  
  // 1. ADD FIELD-SPECIFIC VALIDATIONS FIRST (AT THE TOP)
  const specificAccordion = document.createElement('div');
  specificAccordion.className = 'option-group';
  
  let specificContent = '';
  
  if (fieldConfig.validation) {
    Object.keys(fieldConfig.validation).forEach(validationRule => {
      if (validationRule === 'required') return;
      
      const validationConfig = fieldConfig.validation[validationRule];
      const currentValue = field.attributes.validation && field.attributes.validation[validationRule] !== undefined 
        ? field.attributes.validation[validationRule] 
        : validationConfig;
      
      // Handle different input types based on validation rule type
      if (typeof validationConfig === 'boolean') {
        // Boolean checkbox
        specificContent += `
          <div class="checkbox-label">
            <input type="checkbox" class="option-checkbox" id="option_${validationRule}" 
                   ${currentValue ? 'checked' : ''}>
            <label for="option_${validationRule}">${validationRule.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</label>
          </div>
        `;
      } else if (Array.isArray(validationConfig)) {
        // Array input (comma separated)
        const arrayValue = Array.isArray(currentValue) ? currentValue.join(', ') : currentValue;
        
        // SPECIAL HANDLING FOR DYNAMIC SELECT "OPTIONS"
        if (validationRule === 'options' && field.type === 'dynamicSingleSelect') {
          specificContent += `
            <div class="option-group">
              <label class="option-label" for="option_${validationRule}">Parent Options</label>
              <input type="text" class="option-input" id="option_${validationRule}" 
                     value="${arrayValue}" placeholder="South Africa, Zimbabwe, Canada">
              <small>Comma-separated parent values</small>
            </div>
            <div class="option-group">
              <button type="button" class="control-btn" id="buildChildOptions" 
                      style="padding: 6px 12px; font-size: 12px;">
                <i class="fas fa-plus"></i> Configure Child Options
              </button>
            </div>
          `;
        } else {
          // Regular field options
          specificContent += `
            <div class="option-group">
              <label class="option-label" for="option_${validationRule}">${validationRule.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</label>
              <input type="text" class="option-input" id="option_${validationRule}" 
                     value="${arrayValue}" placeholder="Comma separated values">
            </div>
          `;
        }
      } else if (typeof validationConfig === 'object' && validationConfig !== null) {
        // Nested object - handle custom_patterns, strength_requirements, etc.
        Object.keys(validationConfig).forEach(subRule => {
          const subInputId = `option_${validationRule}_${subRule}`;
          const subCurrentValue = field.attributes.validation && 
                                 field.attributes.validation[validationRule] && 
                                 field.attributes.validation[validationRule][subRule] !== undefined 
            ? field.attributes.validation[validationRule][subRule] 
            : validationConfig[subRule];
          
          if (typeof validationConfig[subRule] === 'boolean') {
            specificContent += `
              <div class="checkbox-label">
                <input type="checkbox" class="option-checkbox" id="${subInputId}" 
                       ${subCurrentValue ? 'checked' : ''}>
                <label for="${subInputId}">${subRule.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</label>
              </div>
            `;
          } else {
            specificContent += `
              <div class="option-group">
                <label class="option-label" for="${subInputId}">${subRule.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</label>
                <input type="text" class="option-input" id="${subInputId}" 
                       value="${subCurrentValue || ''}">
              </div>
            `;
          }
        });
      } else {
        // Regular text/number input
        const inputType = typeof validationConfig === 'number' ? 'number' : 'text';
        specificContent += `
          <div class="option-group">
            <label class="option-label" for="option_${validationRule}">${validationRule.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</label>
            <input type="${inputType}" class="option-input" id="option_${validationRule}" 
                   value="${currentValue !== null ? currentValue : ''}">
          </div>
        `;
      }
    });
  }
  
  if (!specificContent) {
    specificContent = '<div class="option-group"><em>No specific validations for this field type</em></div>';
  }
  
  specificAccordion.innerHTML = `
    <div class="accordion-header" id="specificHeader">
      <div class="accordion-title">Field Specific Validations</div>
      <div class="accordion-icon"><i class="fas fa-chevron-down"></i></div>
    </div>
    <div class="accordion-content" id="specificContent">
      ${specificContent}
    </div>
  `;
  
  this.elements.optionsModalContent.appendChild(specificAccordion);
  
  // 2. ADD CONDITIONAL LOGIC SECTION
  const conditionalAccordion = document.createElement('div');
  conditionalAccordion.className = 'option-group';
  
  // Get current conditional logic values
  const conditionalLogic = this.getNestedValue(field.attributes, 'behavior_conditional_logic') || {
    enabled: false,
    dependsOn: '',
    dependents: '',
    condition_value: ''
  };
  
  conditionalAccordion.innerHTML = `
    <div class="accordion-header" id="conditionalHeader">
      <div class="accordion-title">Conditional Logic</div>
      <div class="accordion-icon"><i class="fas fa-code-branch"></i></div>
    </div>
    <div class="accordion-content" id="conditionalContent">
      
      <div class="checkbox-label">
        <input type="checkbox" class="option-checkbox" id="option_behavior_conditional_logic_enabled" 
               ${conditionalLogic.enabled ? 'checked' : ''}>
        <label for="option_behavior_conditional_logic_enabled">Enable Conditional Display</label>
      </div>
      
      
      <div class="option-group">
        <label class="option-label">Depends On (This field shows when...)</label>
        <div style="display: flex; gap: 8px;">
          <input type="text" class="option-input" id="option_behavior_conditional_logic_dependsOn" 
                 value="${conditionalLogic.dependsOn || ''}" 
                 placeholder="parent_field,value" style="flex: 1;">
          <button type="button" class="control-btn" id="pickFieldBtn" 
                  style="padding: 6px 10px; font-size: 12px;">
            <i class="fas fa-list"></i> Pick Field
          </button>
        </div>
        <small>Format: field_name,value (e.g., gender,Female)</small>
      </div>
      
      <div class="option-group">
        <label class="option-label">Dependent Fields (Fields that show when this field equals...)</label>
        <div style="display: flex; gap: 8px;">
          <input type="text" class="option-input" id="option_behavior_conditional_logic_dependents" 
                 value="${conditionalLogic.dependents || ''}" 
                 placeholder="field1,field2" style="flex: 1;">
          <button type="button" class="control-btn" id="pickDependentsBtn"
                  style="padding: 6px 10px; font-size: 12px;">
            <i class="fas fa-list"></i> Pick Fields
          </button>
        </div>
        <small>Comma-separated field names</small>
      </div>
      
      <div class="option-group">
        <label class="option-label">Condition Value</label>
        <input type="text" class="option-input" id="option_behavior_conditional_logic_condition_value" 
               value="${conditionalLogic.condition_value || ''}" 
               placeholder="Value that triggers dependent fields">
        <small>When this field equals this value, show dependent fields</small>
      </div>
    </div>
  `;
  
  this.elements.optionsModalContent.appendChild(conditionalAccordion);
  
  // 3. THEN ADD UNIVERSAL ATTRIBUTES CATEGORIES
  Object.keys(this.formConfig.universal_attributes).forEach(category => {
    const categoryAccordion = document.createElement('div');
    categoryAccordion.className = 'option-group';
    
    let categoryContentHTML = '';
    const categoryAttrs = this.formConfig.universal_attributes[category];
    
    // Handle nested objects recursively
    const generateAttributeInputs = (obj, prefix = '') => {
      let html = '';
      Object.keys(obj).forEach(attr => {
        if (attr === 'required') return; // Skip required as it's handled in main UI
        
        const fullAttrName = prefix ? `${prefix}_${attr}` : attr;
        const currentValue = this.getNestedValue(field.attributes, fullAttrName) !== undefined 
          ? this.getNestedValue(field.attributes, fullAttrName) 
          : obj[attr];
        
        let inputElement = '';
        const defaultValue = obj[attr];
        
        if (typeof defaultValue === 'boolean') {
          // Boolean attributes use checkboxes
          inputElement = `
            <div class="checkbox-label">
              <input type="checkbox" class="option-checkbox" id="option_${fullAttrName}" 
                     ${currentValue ? 'checked' : ''}>
              <label for="option_${fullAttrName}">${attr.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</label>
            </div>
          `;
        } else if (typeof defaultValue === 'object' && defaultValue !== null && !Array.isArray(defaultValue)) {
          // Nested object - recurse
          html += `<div style="margin-left: 15px; border-left: 2px solid #e5e7eb; padding-left: 10px;">`;
          html += `<div class="option-label" style="margin-top: 10px;">${attr.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</div>`;
          html += generateAttributeInputs(defaultValue, fullAttrName);
          html += `</div>`;
          return html;
        } else {
          // Regular text inputs
          inputElement = `
            <input type="text" class="option-input" id="option_${fullAttrName}" 
                   value="${currentValue}" placeholder="${defaultValue}">
          `;
        }
        
        html += `
          <div class="option-group">
            <label class="option-label" for="option_${fullAttrName}">${attr.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</label>
            ${inputElement}
          </div>
        `;
      });
      return html;
    };
    
    categoryContentHTML = generateAttributeInputs(categoryAttrs);
    
    categoryAccordion.innerHTML = `
      <div class="accordion-header" id="universal_${category}Header">
        <div class="accordion-title">${category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</div>
        <div class="accordion-icon"><i class="fas fa-chevron-down"></i></div>
      </div>
      <div class="accordion-content" id="universal_${category}Content">
        ${categoryContentHTML}
      </div>
    `;
    
    this.elements.optionsModalContent.appendChild(categoryAccordion);
  });
  
  // 4. SET UP ACCORDION BEHAVIOR AND FIELD PICKERS
  setTimeout(() => {
    // Conditional Logic accordion starts collapsed
    const conditionalHeader = this.container.querySelector('#conditionalHeader');
    const conditionalContent = this.container.querySelector('#conditionalContent');
    if (conditionalHeader && conditionalContent) {
      conditionalHeader.addEventListener('click', () => {
        const isActive = conditionalHeader.classList.toggle('active');
        conditionalContent.classList.toggle('active', isActive);
      });
    }
    
    // ALL OTHER CATEGORIES START COLLAPSED
    Object.keys(this.formConfig.universal_attributes).forEach(category => {
      const header = this.container.querySelector(`#universal_${category}Header`);
      const content = this.container.querySelector(`#universal_${category}Content`);
      
      if (header && content) {
        header.addEventListener('click', () => {
          const isActive = header.classList.toggle('active');
          content.classList.toggle('active', isActive);
        });
      }
    });

    const specificHeader = this.container.querySelector('#specificHeader');
    const specificContent = this.container.querySelector('#specificContent');
    
    // Specific validations accordion
    if (specificHeader && specificContent) {
      specificHeader.addEventListener('click', () => {
        const isActive = specificHeader.classList.toggle('active');
        specificContent.classList.toggle('active', isActive);
      });
    }
    
    // SIMPLE FIELD PICKER BUTTONS FOR CONDITIONAL LOGIC
    const pickFieldBtn = this.container.querySelector('#pickFieldBtn');
    const dependsOnInput = this.container.querySelector('#option_behavior_conditional_logic_dependsOn');
    const pickDependentsBtn = this.container.querySelector('#pickDependentsBtn');
    const dependentsInput = this.container.querySelector('#option_behavior_conditional_logic_dependents');
    
    if (pickFieldBtn && dependsOnInput) {
      pickFieldBtn.addEventListener('click', () => {
        const otherFields = this.formData.fields.filter(f => f.id !== this.currentOptionsField);
        if (otherFields.length === 0) {
          alert('No other fields available');
          return;
        }
        
        let fieldList = 'Available fields:\n';
        otherFields.forEach(f => {
          fieldList += `• ${f.name}\n`;
        });
        
        const fieldName = prompt(`${fieldList}\nEnter field name:`);
        if (fieldName) {
          const value = prompt(`Enter value for field "${fieldName}":`);
          if (value !== null) {
            dependsOnInput.value = `${fieldName},${value}`;
          }
        }
      });
    }
    
    if (pickDependentsBtn && dependentsInput) {
      pickDependentsBtn.addEventListener('click', () => {
        const otherFields = this.formData.fields.filter(f => f.id !== this.currentOptionsField);
        if (otherFields.length === 0) {
          alert('No other fields available');
          return;
        }
        
        let fieldList = 'Available fields (Ctrl/Cmd+click to select multiple):\n';
        otherFields.forEach(f => {
          fieldList += `• ${f.name}\n`;
        });
        
        const selected = prompt(`${fieldList}\nEnter field names (comma-separated):`);
        if (selected) {
          dependentsInput.value = selected;
        }
      });
    }
    
    // ENHANCED DYNAMIC SELECT BUILDER
    const buildBtn = this.container.querySelector('#buildChildOptions');
    if (buildBtn) {
      buildBtn.addEventListener('click', () => {
        const parentInput = this.container.querySelector('#option_options');
        if (parentInput && parentInput.value.trim()) {
          const parents = parentInput.value.split(',').map(p => p.trim()).filter(p => p);
          
          if (parents.length === 0) {
            alert('Please enter at least one parent option');
            return;
          }
          
          // Create a step-by-step input for each parent
          let currentIndex = 0;
          
          const promptForChildOptions = (index) => {
            if (index >= parents.length) {
              // All parents done, create the input fields
              createChildInputFields();
              return;
            }
            
            const parent = parents[index];
            const childOptions = prompt(
              `Enter child options for: ${parent}\n\n` +
              `Format: "Child1, Child2, Child3"\n\n` +
              `Example: "Gauteng, Limpopo, Mpumalanga"`,
              field.attributes.validation?.dynamic_options?.[parent]?.join(', ') || ''
            );
            
            if (childOptions !== null) { // User didn't cancel
              // Save the child options temporarily
              if (!field.attributes.validation) field.attributes.validation = {};
              if (!field.attributes.validation.dynamic_options) field.attributes.validation.dynamic_options = {};
              field.attributes.validation.dynamic_options[parent] = childOptions.split(',').map(c => c.trim()).filter(c => c);
              
              // Move to next parent
              promptForChildOptions(index + 1);
            }
          };
          
          const createChildInputFields = () => {
            // Remove any existing child inputs
            const existingContainer = this.container.querySelector('#childOptionsContainer');
            if (existingContainer) {
              existingContainer.remove();
            }
            
            // Create new container
            const container = document.createElement('div');
            container.id = 'childOptionsContainer';
            container.style.marginTop = '10px';
            
            parents.forEach(parent => {
              const safeId = parent.replace(/\s+/g, '_');
              const childOptions = field.attributes.validation?.dynamic_options?.[parent] || [];
              
              container.innerHTML += `
                <div class="option-group" style="margin-left: 10px; border-left: 2px solid #e5e7eb; padding-left: 10px;">
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <label class="option-label" style="font-size: 12px; min-width: 100px;">${parent}:</label>
                    <input type="text" class="option-input" 
                           id="option_dynamic_${safeId}" 
                           value="${childOptions.join(', ')}"
                           placeholder="Child1, Child2" 
                           style="font-size: 12px; flex: 1;">
                  </div>
                </div>
              `;
            });
            
            // Insert after the build button
            buildBtn.parentNode.insertBefore(container, buildBtn.nextSibling);
          };
          
          // Start the step-by-step process
          promptForChildOptions(0);
        } else {
          alert('Please enter parent options first (comma separated)');
        }
      });
    }
  }, 20);
}

saveOptions() {
  if (!this.currentOptionsField) return;

  const field = this.formData.fields.find(f => f.id === this.currentOptionsField);
  if (!field) return;
  
  const fieldConfig = this.formConfig.form_input_types[field.type];
  
  // DON'T reset attributes completely - just update what we need
  if (!field.attributes) {
    field.attributes = {
      required: field.required,
      name: field.name,
      label: field.label || '',
      validation: {}
    };
  }
  
  // *** SAVE CONDITIONAL LOGIC SEPARATELY ***
  // *** SAVE CONDITIONAL LOGIC SEPARATELY ***
const dependsOnInput = this.container.querySelector('#option_behavior_conditional_logic_dependsOn');
const dependentsInput = this.container.querySelector('#option_behavior_conditional_logic_dependents');
const conditionValueInput = this.container.querySelector('#option_behavior_conditional_logic_condition_value');
const enabledInput = this.container.querySelector('#option_behavior_conditional_logic_enabled');

// Only check for the inputs that actually contain data
if (dependsOnInput || dependentsInput || conditionValueInput) {
    const dependsOn = dependsOnInput ? dependsOnInput.value.trim() : '';
    const dependents = dependentsInput ? dependentsInput.value.trim() : '';
    const conditionValue = conditionValueInput ? conditionValueInput.value.trim() : '';
    const enabled = enabledInput ? enabledInput.checked : false;
    
    // Only save if there's actual data
    if (enabled || dependsOn || dependents || conditionValue) {
        if (!field.attributes.behavior_conditional_logic) {
            field.attributes.behavior_conditional_logic = {};
        }
        
        field.attributes.behavior_conditional_logic = {
            enabled: enabled,
            dependsOn: dependsOn,
            dependents: dependents,
            condition_value: conditionValue
        };
    } else {
        delete field.attributes.behavior_conditional_logic;
    }
}


  // *** SAVE DYNAMIC SELECT OPTIONS ***
  if (field.type === 'dynamicSingleSelect') {
    if (!field.attributes.validation) {
      field.attributes.validation = {};
    }
    
    // Get parent options
    const parentInput = this.container.querySelector('#option_options');
    if (parentInput && parentInput.value.trim()) {
      const parents = parentInput.value.split(',').map(p => p.trim()).filter(p => p);
      field.attributes.validation.options = parents;
      
      // Get child options for each parent
      const dynamicOptions = {};
      parents.forEach(parent => {
        const safeId = parent.replace(/\s+/g, '_');
        const childInput = this.container.querySelector(`#option_dynamic_${safeId}`);
        if (childInput && childInput.value.trim()) {
          dynamicOptions[parent] = childInput.value.split(',').map(c => c.trim()).filter(c => c);
        }
      });
      
      field.attributes.validation.dynamic_options = dynamicOptions;
    }
  }
  
  // THEN save universal attributes from all categories
  Object.keys(this.formConfig.universal_attributes).forEach(category => {
    this.saveCategoryAttributes(this.formConfig.universal_attributes[category], field.attributes, '');
  });
  
  // Save field-specific validations (except for dynamic selects which are already handled)
  if (fieldConfig.validation && field.type !== 'dynamicSingleSelect') { // Skip for dynamic selects
    if (!field.attributes.validation) {
      field.attributes.validation = {};
    }
    
    Object.keys(fieldConfig.validation).forEach(validationRule => {
      if (validationRule === 'required') return;
      
      const input = this.container.querySelector(`#option_${validationRule}`);
      
      if (input && this.hasValue(input)) {
        const validationConfig = fieldConfig.validation[validationRule];
        
        if (typeof validationConfig === 'boolean') {
          field.attributes.validation[validationRule] = input.checked;
        } else if (Array.isArray(validationConfig)) {
          field.attributes.validation[validationRule] = input.value.split(',').map(item => item.trim()).filter(item => item);
        } else if (typeof validationConfig === 'object' && validationConfig !== null) {
          if (!field.attributes.validation[validationRule]) {
            field.attributes.validation[validationRule] = {};
          }
          
          Object.keys(validationConfig).forEach(subRule => {
            const subInput = this.container.querySelector(`#option_${validationRule}_${subRule}`);
            if (subInput && this.hasValue(subInput)) {
              if (typeof validationConfig[subRule] === 'boolean') {
                field.attributes.validation[validationRule][subRule] = subInput.checked;
              } else {
                field.attributes.validation[validationRule][subRule] = subInput.value;
              }
            }
          });
        } else {
          if (typeof validationConfig === 'number') {
            field.attributes.validation[validationRule] = input.value ? Number(input.value) : null;
          } else {
            field.attributes.validation[validationRule] = input.value || null;
          }
        }
      }
    });
  }
  
  // Clean up empty objects and arrays
  this.cleanupEmptyValues(field.attributes);
  
  // Force update
  this.updateFormiqueOutput();
  this.renderFormPreview();
  
  this.hideOptionsModal();
}

saveCategoryAttributes(categoryAttrs, targetObj, prefix) {
  Object.keys(categoryAttrs).forEach(attr => {
    if (attr === 'required') return;
    
    const fullAttrName = prefix ? `${prefix}_${attr}` : attr;
    
    // Skip conditional logic as it's handled separately
    if (fullAttrName === 'behavior_conditional_logic') {
      return;
    }
    
    const input = this.container.querySelector(`#option_${fullAttrName}`);
    
    if (input && this.hasValue(input)) {
      const defaultValue = categoryAttrs[attr];
      
      if (typeof defaultValue === 'boolean') {
        if (input.checked !== defaultValue) {
          this.setNestedValue(targetObj, fullAttrName, input.checked);
        }
      } else if (typeof defaultValue === 'object' && defaultValue !== null && !Array.isArray(defaultValue)) {
        const nestedObj = {};
        this.saveCategoryAttributes(defaultValue, nestedObj, fullAttrName);
        if (Object.keys(nestedObj).length > 0) {
          this.setNestedValue(targetObj, fullAttrName, nestedObj);
        }
      } else {
        const value = input.value.trim();
        if (value && value !== String(defaultValue)) {
          this.setNestedValue(targetObj, fullAttrName, value);
        }
      }
    }
  });
}

hasValue(input) {
  if (input.type === 'checkbox') {
    return input.checked !== input.defaultChecked;
  }
  if (input.type === 'number') {
    return input.value !== '' && input.value !== input.defaultValue;
  }
  return input.value.trim() !== '' && input.value !== input.defaultValue;
}

cleanupEmptyValues(obj) {
  Object.keys(obj).forEach(key => {
    if (obj[key] && typeof obj[key] === 'object') {
      this.cleanupEmptyValues(obj[key]);
      if (Object.keys(obj[key]).length === 0) {
        delete obj[key];
      }
    } else if (obj[key] === '' || obj[key] === null || obj[key] === undefined) {
      delete obj[key];
    }
  });
}

getNestedValue(obj, path) {
  return path.split('_').reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : undefined;
  }, obj);
}

setNestedValue(obj, path, value) {
  const keys = path.split('_');
  const lastKey = keys.pop();
  const target = keys.reduce((current, key) => {
    if (!current[key] || typeof current[key] !== 'object') {
      current[key] = {};
    }
    return current[key];
  }, obj);
  target[lastKey] = value;
}




  updateFormiqueOutput() {
    let output = `@form: ${this.formData.form.id}\n`;
    
    // Add form settings
    Object.keys(this.formData.form.settings).forEach(setting => {
      const value = this.formData.form.settings[setting];
      const defaultValue = this.formSettingsConfig.form_settings[setting].default;
      
      if (value !== defaultValue && value !== '' && value !== false) {
        const needsQuotes = typeof value === 'string' && value.includes(' ');
        const formattedValue = needsQuotes ? `"${value}"` : value;
        output += `    ${setting}: ${formattedValue}\n`;
      }
    });
    
    // Add form parameters
    Object.keys(this.formData.form.parameters).forEach(param => {
      const value = this.formData.form.parameters[param];
      const defaultValue = this.formSettingsConfig.form_parameters[param].default;
      
      if (value !== defaultValue && value !== '' && value !== false) {
        const needsQuotes = typeof value === 'string' && value.includes(' ');
        const formattedValue = needsQuotes ? `"${value}"` : value;
        output += `    ${param}: ${formattedValue}\n`;
      }
    });
    
    output += `\n`;
    
    // Add fields
    this.formData.fields.forEach((field) => {
      const required = field.required ? '*' : '';
      const config = this.formConfig.form_input_types[field.type];
      const typeSuffix = field.type !== 'text' ? `:${config.html_type}` : '';
      
      output += `    - ${field.name}${required}${typeSuffix}\n`;
      
      output = this.addAttributesToOutput(field.attributes, output, 6);
    });
    
    this.elements.output.value = output;
  }

  addAttributesToOutput(attributes, output, indentLevel) {
    const indent = ' '.repeat(indentLevel);
    
    Object.keys(attributes).forEach(attr => {
      const value = attributes[attr];
      
      if (value === '' || value === null || value === undefined || 
          (Array.isArray(value) && value.length === 0) ||
          attr === 'name' || attr === 'required') {
        return;
      }
      
      if (attr === 'behavior_conditional_logic' && value) {
        if (value.dependsOn && value.dependsOn.trim()) {
          output += `${indent}dependsOn: ${value.dependsOn}\n`;
        }
        
        if (value.dependents && value.dependents.trim()) {
          output += `${indent}dependents: ${value.dependents}\n`;
        }
        
        return;
      }
      
      if (typeof value === 'boolean') {
        if (value === true) {
          output += `${indent}${attr}: ${value}\n`;
        }
      } else if (typeof value === 'object' && value !== null) {
        if (Array.isArray(value)) {
          output += `${indent}${attr}: ${value.join(', ')}\n`;
        } else {
          if (attr === 'validation') {
            if (value.options && value.dynamic_options) {
              if (value.options && value.options.length > 0) {
                output += `${indent}options: ${value.options.join(', ')}\n`;
              }
              
              Object.keys(value.dynamic_options).forEach(parent => {
                const children = value.dynamic_options[parent];
                if (children && children.length > 0) {
                  output += `${indent}${parent}: ${children.join(', ')}\n`;
                }
              });
              return;
            }
            
            Object.keys(value).forEach(validationKey => {
              const validationValue = value[validationKey];
              if (validationValue !== '' && validationValue !== null && validationValue !== undefined) {
                if (typeof validationValue === 'boolean' && !validationValue) {
                  return;
                }
                const needsQuotes = typeof validationValue === 'string' && 
                                   (validationValue.includes(' ') || validationValue.includes('-'));
                const formattedValue = needsQuotes ? `"${validationValue}"` : validationValue;
                output += `${indent}${validationKey}: ${formattedValue}\n`;
              }
            });
          } else {
            output = this.flattenObjectToOutput(value, attr, output, indentLevel);
          }
        }
      } else {
        const needsQuotes = typeof value === 'string' && 
                           (value.includes(' ') || value.includes('-') || 
                            value.includes('[') || value.includes('{'));
        const formattedValue = needsQuotes ? `"${value}"` : value;
        output += `${indent}${attr}: ${formattedValue}\n`;
      }
    });
    
    return output;
  }

  flattenObjectToOutput(obj, prefix, output, indentLevel) {
    const indent = ' '.repeat(indentLevel);
    
    Object.keys(obj).forEach(key => {
      const value = obj[key];
      const fullKey = `${prefix}.${key}`;
      
      if (value !== '' && value !== null && value !== undefined) {
        if (fullKey === 'validation') {
          return;
        }
        
        if (fullKey === 'validation.options') {
          const formattedValue = Array.isArray(value) ? value.join(', ') : value;
          output += `${indent}options: ${formattedValue}\n`;
          return;
        }
        
        if (fullKey.includes('custom.css') || fullKey.includes('custom_css')) {
          const needsQuotes = typeof value === 'string' && 
                             (value.includes(' ') || value.includes('-') || 
                              value.includes('[') || value.includes('{'));
          const formattedValue = needsQuotes ? `"${value}"` : value;
          output += `${indent}style: ${formattedValue}\n`;
          return;
        }
        
        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
          output = this.flattenObjectToOutput(value, fullKey, output, indentLevel);
        } else {
          const needsQuotes = typeof value === 'string' && 
                             (value.includes(' ') || value.includes('-') || 
                              value.includes('[') || value.includes('{'));
          const formattedValue = needsQuotes ? `"${value}"` : value;
          output += `${indent}${fullKey}: ${formattedValue}\n`;
        }
      }
    });
    
    return output;
  }

  // Public API methods
  getOutput() {
    return this.elements.output?.value || '';
  }

  reset() {
    this.formData.fields = [];
    this.formData.form.id = "user-registration";
    this.formData.form.settings = { ...this.getDefaultState().form.settings };
    this.formData.form.parameters = { ...this.getDefaultState().form.parameters };
    
    // Regenerate settings UI if it exists
    if (this.elements.formSettingsFields) {
      this.generateFormSettings();
    }
    
    this.renderFormPreview();
    this.updateFormiqueOutput();
  }

  getDefaultState() {
    return {
      form: {
        id: "user-registration",
        settings: {
          theme: "light",
          themeColor: "#39a0ca",
          submitOnPage: false,
          submitMode: "email",
          sendTo: "",
          successMessage: "",
          errorMessage: "",
          requiredFieldIndicator: true,
          placeholders: true,
          formContainerId: "formique",
          formContainerStyle: ""
        },
        parameters: {
          method: "POST",
          action: "",
          id: "",
          class: "",
          style: "",
          enctype: "application/x-www-form-urlencoded",
          target: "_self",
          novalidate: false,
          accept_charset: "UTF-8"
        }
      },
      fields: []
    };
  }

  destroy() {
    // Remove the builder from DOM
    this.container.innerHTML = '';
    // Clear references
    this.elements = null;
    this.formData = null;
  }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = FormiqueBuilder;
} else {
  window.FormiqueBuilder = FormiqueBuilder;
}