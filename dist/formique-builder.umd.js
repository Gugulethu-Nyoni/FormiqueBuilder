(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.FormiqueBuilder = factory());
})(this, (function () { 'use strict';

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	var formiqueBuilder$1 = {exports: {}};

	(function (module) {
		const css = `
.formique-builder {
  --uf-color-primary: #39a0ca;
  --uf-color-accent: #ff6b8b;
  --uf-color-secondary: #9c6bff;
  --uf-color-bg-canvas: #ffffff;
  --uf-color-text-dark: #313d4b;
  --uf-color-text-secondary: #6b7280;
  --uf-color-border-subtle: #e5e7eb;
  --uf-radius-md: 6px;
  --uf-radius-lg: 8px;
  --uf-shadow-md: 0 2px 8px rgba(0,0,0,0.1);
  --uf-shadow-lg: 0 4px 12px rgba(0,0,0,0.1);
}

.formique-builder *:not(i) {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.formique-builder {
  background: #f8fafc;
  color: var(--uf-color-text-dark);
  line-height: 1.5;
  max-width: 1000px;
  margin: 0 auto;
  font-size: 14px;
}

.formique-builder .fb-header {
  text-align: center;
  margin-bottom: 25px;
}

.formique-builder .fb-header h1 {
  font-size: 1.8rem;
  margin-bottom: 8px;
  background: linear-gradient(135deg, var(--uf-color-primary) 0%, var(--uf-color-secondary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.formique-builder .fb-header p {
  color: var(--uf-color-text-secondary);
  font-size: 0.9rem;
}

.formique-builder .fb-builder-container {
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 20px;
  margin-bottom: 30px;
}

.formique-builder .fb-form-preview {
  background: white;
  border-radius: var(--uf-radius-lg);
  padding: 20px;
  box-shadow: var(--uf-shadow-md);
  min-height: 300px;
}

.formique-builder .fb-add-block-center {
  text-align: center;
  margin-top: 10px;
}

.formique-builder .fb-add-block-btn {
  background: var(--uf-color-primary);
  color: white;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.formique-builder .fb-add-block-btn:hover {
  background: #2d8db8;
  transform: scale(1.1);
}

.formique-builder .fb-output-panel {
  background: white;
  border-radius: var(--uf-radius-lg);
  padding: 20px;
  box-shadow: var(--uf-shadow-md);
  display: flex;
  flex-direction: column;
}

.formique-builder .fb-output-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding: 0;
}

.formique-builder .fb-output-header h3 {
  color: var(--uf-color-text-dark);
  font-size: 1rem;
  margin: 0;
}

.formique-builder .fb-output-actions {
  display: flex;
  gap: 8px;
}

.formique-builder .fb-copy-btn,
.formique-builder .fb-submit-btn {
  background: var(--uf-color-primary);
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: var(--uf-radius-md);
  font-size: 0.8rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: all 0.2s;
}

.formique-builder .fb-submit-btn {
  background: var(--uf-color-secondary);
}

.formique-builder .fb-copy-btn:hover {
  background: #2d8db8;
}

.formique-builder .fb-submit-btn:hover {
  background: #8a5bff;
}

.formique-builder #fb-formiqueOutput {
  width: 100%;
  height: 200px;
  border: 1px solid var(--uf-color-border-subtle);
  border-radius: var(--uf-radius-md);
  padding: 12px;
  font-family: 'Courier New', monospace;
  font-size: 13px;
  resize: vertical;
  background: #f9fafb;
  box-sizing: border-box;
  margin: 0;
}

/* Form Block Styles */
.formique-builder .fb-form-block {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  border: 1px dashed var(--uf-color-border-subtle);
  border-radius: var(--uf-radius-md);
  margin-bottom: 10px;
  background: white;
  transition: all 0.2s ease;
  position: relative;
  font-size: 13px;
  width: 100%;
  box-sizing: border-box;
  flex-wrap: wrap;
}

.formique-builder .fb-form-block:hover {
  border-color: var(--uf-color-primary);
}

.formique-builder .fb-form-block.fb-selected {
  border-color: var(--uf-color-primary);
  background: #f0f9ff;
}

.formique-builder .fb-drag-handle {
  cursor: grab;
  color: var(--uf-color-text-secondary);
  padding: 4px;
  font-size: 12px;
}

.formique-builder .fb-drag-handle:active {
  cursor: grabbing;
}

.formique-builder .fb-add-element-btn {
  background: var(--uf-color-primary);
  color: white;
  border: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 12px;
}

.formique-builder .fb-input-area {
  flex: 1;
  position: relative;
  min-width: 200px;
}

.formique-builder .fb-input-main {
  width: 100%;
  padding: 8px 10px;
  border: 1px solid var(--uf-color-border-subtle);
  border-radius: var(--uf-radius-md);
  font-size: 13px;
  transition: all 0.2s;
  box-sizing: border-box;
}

.formique-builder .fb-input-main:focus {
  outline: none;
  border-color: var(--uf-color-primary);
  box-shadow: 0 0 0 2px rgba(57, 160, 202, 0.1);
}

.formique-builder .fb-placeholder-text {
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  color: var(--uf-color-text-secondary);
  pointer-events: none;
  background: white;
  padding: 0 4px;
  font-size: 13px;
}

.formique-builder .fb-input-main:focus + .fb-placeholder-text,
.formique-builder .fb-input-main:not(:placeholder-shown) + .fb-placeholder-text {
  display: none;
}

.formique-builder .fb-block-controls {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
  min-width: fit-content;
  margin-left: auto;
}

.formique-builder .fb-control-btn {
  background: none;
  border: none;
  color: var(--uf-color-text-secondary);
  cursor: pointer;
  padding: 4px;
  border-radius: 3px;
  transition: all 0.2s;
  font-size: 12px;
}

.formique-builder .fb-control-btn:hover {
  background: #f3f4f6;
  color: var(--uf-color-text-dark);
}

.formique-builder .fb-required-toggle {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  color: var(--uf-color-text-secondary);
  white-space: nowrap;
}

.formique-builder .fb-required-toggle input[type="checkbox"] {
  margin: 0;
  width: 13px;
  height: 13px;
  cursor: pointer;
  opacity: 1;
  position: relative;
  z-index: 1;
}

.formique-builder .fb-type-indicator {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--uf-color-primary);
  font-size: 12px;
}

/* Dropdown Styles */
.formique-builder .fb-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  width: 350px;
  max-height: 250px;
  overflow-y: auto;
  background: white;
  border: 1px solid var(--uf-color-border-subtle);
  border-radius: var(--uf-radius-md);
  box-shadow: var(--uf-shadow-lg);
  z-index: 1000;
  display: none;
}

.formique-builder .fb-dropdown.fb-active {
  display: block;
}

.formique-builder .fb-dropdown-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  cursor: pointer;
  border-bottom: 1px solid var(--uf-color-border-subtle);
  transition: background 0.2s;
  font-size: 13px;
}

.formique-builder .fb-dropdown-item:last-child {
  border-bottom: none;
}

.formique-builder .fb-dropdown-item:hover {
  background: #f9fafb;
}

.formique-builder .fb-dropdown-icon {
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--uf-color-primary);
  font-size: 12px;
}

.formique-builder .fb-dropdown-name {
  font-weight: 500;
  color: var(--uf-color-text-dark);
}

/* Modal Styles */
.formique-builder .fb-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: none;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 15px;
}

.formique-builder .fb-modal-overlay.fb-active {
  display: flex;
}

.formique-builder .fb-modal {
  background: white;
  border-radius: var(--uf-radius-lg);
  width: 100%;
  max-width: 700px;
  max-height: 80vh;
  overflow: hidden;
  display: flex;
  box-shadow: var(--uf-shadow-lg);
}

.formique-builder .fb-modal-sidebar {
  width: 200px;
  background: #f9fafb;
  border-right: 1px solid var(--uf-color-border-subtle);
  overflow-y: auto;
}

.formique-builder .fb-modal-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

.formique-builder .fb-element-list {
  list-style: none;
}

.formique-builder .fb-element-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 15px;
  cursor: pointer;
  border-bottom: 1px solid var(--uf-color-border-subtle);
  transition: background 0.2s;
  font-size: 13px;
}

.formique-builder .fb-element-item:hover {
  background: white;
}

.formique-builder .fb-element-item.fb-active {
  background: white;
  border-right: 2px solid var(--uf-color-primary);
}

.formique-builder .fb-element-icon {
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--uf-color-primary);
  font-size: 12px;
}

.formique-builder .fb-element-name {
  font-weight: 500;
  color: var(--uf-color-text-dark);
}

.formique-builder .fb-element-description {
  margin-bottom: 15px;
  color: var(--uf-color-text-secondary);
  line-height: 1.5;
  font-size: 13px;
}

.formique-builder .fb-element-preview {
  background: #f8fafc;
  border: 1px solid var(--uf-color-border-subtle);
  border-radius: var(--uf-radius-md);
  padding: 15px;
  margin-top: 15px;
}

.formique-builder .fb-preview-label {
  font-weight: 500;
  margin-bottom: 6px;
  color: var(--uf-color-text-dark);
  font-size: 13px;
}

.formique-builder .fb-preview-input {
  width: 100%;
  padding: 6px 10px;
  border: 1px solid var(--uf-color-border-subtle);
  border-radius: var(--uf-radius-md);
  background: white;
  font-size: 13px;
}

.formique-builder .fb-modal-actions {
  display: flex;
  gap: 8px;
  margin-top: 20px;
}

.formique-builder .fb-btn {
  padding: 8px 16px;
  border-radius: var(--uf-radius-md);
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: all 0.2s;
  font-size: 13px;
}

.formique-builder .fb-btn-primary {
  background: var(--uf-color-primary);
  color: white;
}

.formique-builder .fb-btn-primary:hover {
  background: #2d8db8;
}

.formique-builder .fb-btn-outline {
  background: transparent;
  border: 1px solid var(--uf-color-border-subtle);
  color: var(--uf-color-text-dark);
}

.formique-builder .fb-btn-outline:hover {
  background: #f9fafb;
}

/* Options Modal */
.formique-builder .fb-options-modal {
  position: fixed;
  width: 320px;
  max-height: 80vh;
  overflow-y: auto;
  background: white;
  border: 1px solid var(--uf-color-border-subtle);
  border-radius: var(--uf-radius-md);
  box-shadow: var(--uf-shadow-lg);
  z-index: 1000;
  display: none;
  padding: 15px;
  cursor: move;
}

.formique-builder .fb-options-modal.fb-active {
  display: block;
}

.formique-builder .fb-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--uf-color-border-subtle);
  cursor: move;
}

.formique-builder .fb-modal-header h4 {
  color: var(--uf-color-text-dark);
  font-size: 14px;
}

.formique-builder .fb-close-modal {
  background: none;
  border: none;
  color: var(--uf-color-text-secondary);
  cursor: pointer;
  font-size: 16px;
}

.formique-builder .fb-option-group {
  margin-bottom: 15px;
}

.formique-builder .fb-option-label {
  display: block;
  margin-bottom: 6px;
  font-weight: 500;
  color: var(--uf-color-text-dark);
  font-size: 13px;
}

.formique-builder .fb-option-input,
.formique-builder .fb-option-select {
  width: 100%;
  padding: 6px 10px;
  border: 1px solid var(--uf-color-border-subtle);
  border-radius: var(--uf-radius-md);
  font-size: 13px;
}

.formique-builder .fb-option-textarea {
  width: 100%;
  padding: 6px 10px;
  border: 1px solid var(--uf-color-border-subtle);
  border-radius: var(--uf-radius-md);
  font-size: 13px;
  resize: vertical;
  min-height: 60px;
}

.formique-builder .fb-option-checkbox {
  margin-right: 8px;
}

.formique-builder .fb-checkbox-label {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  font-size: 13px;
}

/* Toast Styles */
.formique-builder .fb-toast {
  position: fixed;
  bottom: 15px;
  right: 15px;
  background: var(--uf-color-text-dark);
  color: white;
  padding: 10px 16px;
  border-radius: var(--uf-radius-md);
  box-shadow: var(--uf-shadow-lg);
  display: none;
  align-items: center;
  gap: 12px;
  z-index: 3000;
  font-size: 13px;
}

.formique-builder .fb-toast.fb-active {
  display: flex;
}

.formique-builder .fb-toast-undo {
  color: var(--uf-color-primary);
  background: none;
  border: none;
  cursor: pointer;
  font-weight: 600;
  font-size: 13px;
}

/* Empty State */
.formique-builder .fb-empty-state {
  text-align: center;
  padding: 40px 15px;
  color: var(--uf-color-text-secondary);
}

.formique-builder .fb-empty-state i {
  font-size: 36px;
  margin-bottom: 15px;
  color: var(--uf-color-border-subtle);
}

/* Form Settings Panel */
.formique-builder .fb-form-settings-panel {
  background: white;
  border-radius: var(--uf-radius-lg);
  padding: 20px;
  box-shadow: var(--uf-shadow-md);
  margin-bottom: 20px;
}

.formique-builder .fb-settings-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.formique-builder .fb-settings-header h3 {
  color: var(--uf-color-text-dark);
  font-size: 1rem;
}

.formique-builder .fb-settings-toggle {
  background: none;
  border: none;
  color: var(--uf-color-primary);
  cursor: pointer;
  font-size: 13px;
}

.formique-builder .fb-settings-content {
  display: none;
}

.formique-builder .fb-settings-content.fb-active {
  display: block;
}

.formique-builder .fb-settings-group {
  margin-bottom: 15px;
}

.formique-builder .fb-settings-label {
  display: block;
  margin-bottom: 6px;
  font-weight: 500;
  color: var(--uf-color-text-dark);
  font-size: 13px;
}

.formique-builder .fb-settings-input,
.formique-builder .fb-settings-select {
  width: 100%;
  padding: 6px 10px;
  border: 1px solid var(--uf-color-border-subtle);
  border-radius: var(--uf-radius-md);
  font-size: 13px;
}

.formique-builder .fb-color-input-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.formique-builder .fb-color-preview {
  width: 30px;
  height: 30px;
  border-radius: var(--uf-radius-md);
  border: 1px solid var(--uf-color-border-subtle);
}

.formique-builder .fb-drag-ghost {
  opacity: 0.6;
}

.formique-builder .fb-accordion-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  cursor: pointer;
  border-bottom: 1px solid var(--uf-color-border-subtle);
  margin-bottom: 10px;
}

.formique-builder .fb-accordion-title {
  font-weight: 600;
  color: var(--uf-color-text-dark);
  font-size: 13px;
}

.formique-builder .fb-accordion-icon {
  transition: transform 0.2s;
}

.formique-builder .fb-accordion-content {
  display: none;
  margin-bottom: 15px;
}

.formique-builder .fb-accordion-content.fb-active {
  display: block;
}

.formique-builder .fb-accordion-header.fb-active .fb-accordion-icon {
  transform: rotate(180deg);
}

/* Mobile Responsive Styles */
@media (max-width: 768px) {
  .formique-builder .fb-builder-container {
    grid-template-columns: 1fr;
  }
  
  .formique-builder .fb-modal {
    flex-direction: column;
    max-height: 70vh;
  }
  
  .formique-builder .fb-modal-sidebar {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid var(--uf-color-border-subtle);
  }
  
  .formique-builder .fb-form-block {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }
  
  .formique-builder .fb-input-area {
    min-width: 100%;
  }
  
  .formique-builder .fb-block-controls {
    justify-content: flex-end;
    margin-left: 0;
    width: 100%;
  }
  
  .formique-builder .fb-drag-handle {
    align-self: flex-start;
  }
  
  .formique-builder .fb-add-element-btn {
    align-self: flex-start;
  }
  
  .formique-builder .fb-options-modal {
    position: fixed;
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, -50%);
    width: 90%;
    max-width: 320px;
    margin: 0;
    cursor: default;
  }
  
  .formique-builder .fb-options-modal .fb-modal-header {
    cursor: default;
  }
}

/* Small mobile devices */
@media (max-width: 480px) {
  .formique-builder .fb-form-block {
    padding: 8px 10px;
  }
  
  .formique-builder .fb-block-controls {
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px;
  }
  
  .formique-builder .fb-required-toggle {
    white-space: normal;
  }
  
  .formique-builder .fb-input-main {
    padding: 6px 8px;
    font-size: 12px;
  }
  
  .formique-builder .fb-options-modal {
    width: 95%;
    padding: 12px;
  }
}
`;

		class FormiqueBuilder {
		  constructor(options = {}) {
		    // Default options
		    const defaultOptions = {
		      containerId: 'formique-builder',
		      showFormSettings: true
		    };
		    
		    // Merge provided options with defaults
		    this.options = { ...defaultOptions, ...options };
		    
		    // Get container
		    this.container = document.getElementById(this.options.containerId);

		    if (!this.container) {
		      console.error(`FormiqueBuilder: Container #${this.options.containerId} not found`);
		      return;
		    }

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
		          "preview": '<input type="text" placeholder="Enter text" class="fb-preview-input">',
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
		          "preview": '<input type="email" placeholder="Enter your email" class="fb-preview-input">',
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
		          "preview": '<input type="number" placeholder="Enter a number" class="fb-preview-input">',
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
		          "preview": '<input type="password" placeholder="Enter password" class="fb-preview-input">',
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
		          "preview": '<input type="tel" placeholder="Enter phone number" class="fb-preview-input">',
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
		          "preview": '<input type="date" class="fb-preview-input">',
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
		          "preview": '<input type="time" class="fb-preview-input">',
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
		          "preview": '<input type="datetime-local" class="fb-preview-input">',
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
		          "preview": '<input type="month" class="fb-preview-input">',
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
		          "preview": '<input type="week" class="fb-preview-input">',
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
		          "preview": '<input type="url" placeholder="Enter URL" class="fb-preview-input">',
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
		          "preview": '<input type="search" placeholder="Search..." class="fb-preview-input">',
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
		          "preview": '<input type="color" class="fb-preview-input">',
		          "validation": {
		            "required": false
		          }
		        },
		        "file": {
		          "display_name": "File Upload",
		          "description": "For file uploads",
		          "html_type": "file",
		          "icon": "fas fa-file-upload",
		          "preview": '<input type="file" class="fb-preview-input">',
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
		          "preview": '<input type="hidden" class="fb-preview-input">',
		          "validation": {
		            "required": false
		          }
		        },
		        "image": {
		          "display_name": "Image Upload",
		          "description": "For image file uploads",
		          "html_type": "image",
		          "icon": "fas fa-image",
		          "preview": '<input type="image" src="" alt="Submit" class="fb-preview-input">',
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
		          "preview": '<textarea placeholder="Enter text" class="fb-preview-input" rows="4"></textarea>',
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
		          "preview": '<select class="fb-preview-input"><option value="">Select an option</option><option>Option 1</option><option>Option 2</option></select>',
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
		          "preview": '<select class="fb-preview-input"><option>Parent → Child</option></select>',
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
		          "preview": '<select multiple class="fb-preview-input"><option>Option 1</option><option>Option 2</option><option>Option 3</option></select>',
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
		          "preview": '<button type="button" type="submit" class="fb-preview-input fb-btn-primary">Submit</button>',
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

		async init() {
		    try {
		      await this.loadFontAwesome();
		      this.injectStyles();
		      this.container.classList.add('formique-builder');
		      this.container.innerHTML = this.getTemplate();
		      this.cacheElements();
		      this.populateElementModal();
		      this.populateElementDropdown();
		      this.generateFormSettings();
		      this.renderFormPreview();
		      this.updateFormiqueOutput();
		      this.attachEvents();
		      console.log("FormiqueBuilder: Initialized successfully with icons.");
		    } catch (error) {
		      console.error("FormiqueBuilder: Initialization failed", error);
		    }
		  }

		  loadFontAwesome() {
		    return new Promise((resolve, reject) => {
		      if (document.querySelector('#formique-fa')) {
		        resolve();
		        return;
		      }

		      const link = document.createElement('link');
		      link.id = 'formique-fa';
		      link.rel = 'stylesheet';
		      link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
		      
		      link.onload = () => resolve();
		      link.onerror = () => reject(new Error("Could not load Font Awesome"));
		      
		      document.head.appendChild(link);
		    });
		  }

		  injectStyles() {
		    if (document.getElementById('formique-builder-styles')) return;
		    const style = document.createElement('style');
		    style.id = 'formique-builder-styles';
		    
		    // Use the already prefixed CSS
		    style.textContent = css;
		    document.head.appendChild(style);
		  }

		  getTemplate() {
		    const formSettingsHtml = this.options.showFormSettings ? `
      <div class="fb-form-settings-panel">
        <div class="fb-settings-header">
          <h3>Form Settings</h3>
          <button type="button" class="fb-settings-toggle" id="fb-settingsToggle">
            <i class="fas fa-chevron-up"></i> Hide Settings
          </button>
        </div>

        <div class="fb-settings-content fb-active" id="fb-settingsContent">
          <div class="fb-settings-group">
            <label class="fb-settings-label">Form ID</label>
            <input type="text" class="fb-settings-input" id="fb-formId" value="user-registration">
          </div>

          <div class="fb-option-group">
            <div class="fb-accordion-header" id="fb-formSettingsHeader">
              <div class="fb-accordion-title">Form Settings</div>
              <div class="fb-accordion-icon"><i class="fas fa-chevron-down"></i></div>
            </div>
            <div class="fb-accordion-content" id="fb-formSettingsContent">
              <div id="fb-formSettingsFields"></div>
            </div>
          </div>

          <div class="fb-option-group">
            <div class="fb-accordion-header" id="fb-formParamsHeader">
              <div class="fb-accordion-title">Form Parameters</div>
              <div class="fb-accordion-icon"><i class="fas fa-chevron-down"></i></div>
            </div>
            <div class="fb-accordion-content" id="fb-formParamsContent">
              <div id="fb-formParamsFields"></div>
            </div>
          </div>
        </div>
      </div>
    ` : '';

		    return `
      ${formSettingsHtml}

      <div class="fb-builder-container">
        <div class="fb-form-preview" id="fb-formPreview">
          <div class="fb-empty-state" id="fb-emptyState">
            <i class="fas fa-file-alt"></i>
            <h3>Start building your form</h3>
            <p>Add your first field to get started</p>
          </div>
        </div>

        <div class="fb-output-panel">
          <div class="fb-output-header">
            <div class="fb-output-actions">
              <!-- Actions can go here -->
            </div>
          </div>
          <textarea id="fb-formiqueOutput">@form: user-registration
  - field-name</textarea>
        </div>
      </div>

      <div class="fb-dropdown" id="fb-elementDropdown"></div>

      <div class="fb-modal-overlay" id="fb-modalOverlay">
        <div class="fb-modal">
          <div class="fb-modal-sidebar">
            <ul class="fb-element-list" id="fb-elementList"></ul>
          </div>
          <div class="fb-modal-content">
            <h3 id="fb-modalTitle">Text</h3>
            <p class="fb-element-description" id="fb-modalDescription">
              For single-line text input
            </p>
            
            <div class="fb-element-preview">
              <div class="fb-preview-label">Example Preview</div>
              <div id="fb-modalPreview"></div>
            </div>

            <div class="fb-modal-actions">
              <button type="button" class="fb-btn fb-btn-primary" id="fb-insertElement">Insert Element</button>
              <button type="button" class="fb-btn fb-btn-outline" id="fb-closeModal">Cancel</button>
            </div>
          </div>
        </div>
      </div>

      <div class="fb-options-modal" id="fb-optionsModal">
        <div class="fb-modal-header">
          <h4 id="fb-optionsModalTitle">Field Options</h4>
          <div class="fb-modal-actions">
            <button type="button" class="fb-btn fb-btn-primary" id="fb-saveOptions">Save</button>
            <button type="button" class="fb-close-modal" id="fb-closeOptions">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
        <div id="fb-optionsModalContent"></div>
      </div>

      <div class="fb-toast" id="fb-toast">
        <span>Field deleted</span>
        <button type="button" class="fb-toast-undo" id="fb-undoDelete">Undo</button>
      </div>
    `;
		  }

		  cacheElements() {
		    this.elements = {
		      preview: this.container.querySelector('#fb-formPreview'),
		      output: this.container.querySelector('#fb-formiqueOutput'),
		      emptyState: this.container.querySelector('#fb-emptyState'),
		      settingsToggle: this.container.querySelector('#fb-settingsToggle'),
		      settingsContent: this.container.querySelector('#fb-settingsContent'),
		      formId: this.container.querySelector('#fb-formId'),
		      copyBtn: this.container.querySelector('#fb-copyOutput'),
		      submitBtn: this.container.querySelector('#fb-submitForm'),
		      modalOverlay: this.container.querySelector('#fb-modalOverlay'),
		      optionsModal: this.container.querySelector('#fb-optionsModal'),
		      toast: this.container.querySelector('#fb-toast'),
		      undoBtn: this.container.querySelector('#fb-undoDelete'),
		      elementList: this.container.querySelector('#fb-elementList'),
		      elementDropdown: this.container.querySelector('#fb-elementDropdown'),
		      modalTitle: this.container.querySelector('#fb-modalTitle'),
		      modalDescription: this.container.querySelector('#fb-modalDescription'),
		      modalPreview: this.container.querySelector('#fb-modalPreview'),
		      insertElement: this.container.querySelector('#fb-insertElement'),
		      closeModal: this.container.querySelector('#fb-closeModal'),
		      optionsModalTitle: this.container.querySelector('#fb-optionsModalTitle'),
		      optionsModalContent: this.container.querySelector('#fb-optionsModalContent'),
		      closeOptions: this.container.querySelector('#fb-closeOptions'),
		      saveOptions: this.container.querySelector('#fb-saveOptions'),
		      formSettingsFields: this.container.querySelector('#fb-formSettingsFields'),
		      formParamsFields: this.container.querySelector('#fb-formParamsFields'),
		      formSettingsHeader: this.container.querySelector('#fb-formSettingsHeader'),
		      formParamsHeader: this.container.querySelector('#fb-formParamsHeader'),
		      formSettingsContent: this.container.querySelector('#fb-formSettingsContent'),
		      formParamsContent: this.container.querySelector('#fb-formParamsContent')
		    };
		  }

		  attachEvents() {
		    if (this.elements.settingsToggle) {
		      this.elements.settingsToggle.addEventListener('click', () => {
		        const isActive = this.elements.settingsContent.classList.toggle('fb-active');
		        this.elements.settingsToggle.innerHTML = isActive ? 
		          '<i class="fas fa-chevron-up"></i> Hide Settings' : 
		          '<i class="fas fa-chevron-down"></i> Show Settings';
		      });
		    }

		    this.elements.undoBtn.addEventListener('click', () => {
		      if (this.deletedField) {
		        this.formData.fields.splice(this.deletedField.index, 0, this.deletedField.field);
		        this.renderFormPreview();
		        this.updateFormiqueOutput();
		        this.elements.toast.classList.remove('fb-active');
		        this.deletedField = null;
		      }
		    });

		    this.elements.closeModal.addEventListener('click', () => {
		      this.hideModal();
		    });

		    this.elements.closeOptions.addEventListener('click', () => {
		      this.hideOptionsModal();
		    });

		    this.elements.saveOptions.addEventListener('click', () => {
		      this.saveOptions();
		    });

		    this.elements.insertElement.addEventListener('click', () => {
		      if (this.currentInput !== null) {
		        this.addFormBlock(this.currentModalType, this.currentInput + 1);
		        this.hideModal();
		      }
		    });

		    if (this.elements.formId) {
		      this.elements.formId.addEventListener('input', (e) => {
		        this.formData.form.id = e.target.value;
		        this.updateFormiqueOutput();
		      });
		    }

		    this.elements.elementList.addEventListener('click', (e) => {
		      const item = e.target.closest('.fb-element-item');
		      if (item) {
		        this.container.querySelectorAll('.fb-element-item').forEach(i => i.classList.remove('fb-active'));
		        item.classList.add('fb-active');
		        this.setActiveElement(item.dataset.type);
		      }
		    });

		    document.addEventListener('click', (e) => {
		      if (!e.target.closest('.fb-dropdown') && !e.target.matches('.fb-input-main')) {
		        this.hideAllDropdowns();
		      }
		      
		      if (!e.target.closest('.fb-modal') && e.target.closest('.fb-modal-overlay')) {
		        this.hideModal();
		      }
		      
		      if (!e.target.closest('.fb-options-modal') && !e.target.closest('.fb-options-btn')) {
		        this.hideOptionsModal();
		      }
		    });

		    if (this.elements.formSettingsHeader) {
		      this.elements.formSettingsHeader.addEventListener('click', () => {
		        const isActive = this.elements.formSettingsHeader.classList.toggle('fb-active');
		        this.elements.formSettingsContent.classList.toggle('fb-active', isActive);
		        const icon = this.elements.formSettingsHeader.querySelector('.fb-accordion-icon i');
		        icon.className = isActive ? 'fas fa-chevron-up' : 'fas fa-chevron-down';
		      });
		    }
		    
		    if (this.elements.formParamsHeader) {
		      this.elements.formParamsHeader.addEventListener('click', () => {
		        const isActive = this.elements.formParamsHeader.classList.toggle('fb-active');
		        this.elements.formParamsContent.classList.toggle('fb-active', isActive);
		        const icon = this.elements.formParamsHeader.querySelector('.fb-accordion-icon i');
		        icon.className = isActive ? 'fas fa-chevron-up' : 'fas fa-chevron-down';
		      });
		    }
		  }

		  populateElementModal() {
		    if (!this.elements.elementList) return;
		    
		    this.elements.elementList.innerHTML = '';
		    
		    Object.entries(this.formConfig.form_input_types).forEach(([key, config]) => {
		      const li = document.createElement('li');
		      li.className = `fb-element-item ${key === 'text' ? 'fb-active' : ''}`;
		      li.dataset.type = key;
		      
		      li.innerHTML = `
        <div class="fb-element-icon"><i class="${config.icon}"></i></div>
        <div class="fb-element-name">${config.display_name}</div>
      `;
		      
		      this.elements.elementList.appendChild(li);
		    });
		  }

		  populateElementDropdown() {
		    if (!this.elements.elementDropdown) return;
		    
		    this.elements.elementDropdown.innerHTML = '';
		    
		    Object.entries(this.formConfig.form_input_types).forEach(([key, config]) => {
		      const item = document.createElement('div');
		      item.className = 'fb-dropdown-item';
		      item.dataset.type = key;
		      
		      item.innerHTML = `
        <div class="fb-dropdown-icon"><i class="${config.icon}"></i></div>
        <div class="fb-dropdown-name">${config.display_name}</div>
      `;
		      
		      this.elements.elementDropdown.appendChild(item);
		    });
		  }

		  generateFormSettings() {
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
            <select class="fb-settings-input fb-form-setting" data-setting="${setting}">
              ${config.options.map(opt => 
	                `<option value="${opt}" ${currentValue === opt ? 'selected' : ''}>${opt}</option>`
	              ).join('')}
            </select>
          `;
		          break;
		        case 'checkbox':
		          inputField = `
            <label class="fb-checkbox-label">
              <input type="checkbox" class="fb-form-setting" data-setting="${setting}" ${currentValue ? 'checked' : ''}>
              <span>${config.description}</span>
            </label>
          `;
		          break;
		        case 'color':
		          inputField = `
            <div class="fb-color-input-container">
              <input type="color" class="fb-settings-input fb-form-setting" data-setting="${setting}" value="${currentValue}">
              <div class="fb-color-preview" style="background-color: ${currentValue};"></div>
            </div>
          `;
		          break;
		        default:
		          inputField = `
            <input type="text" class="fb-settings-input fb-form-setting" data-setting="${setting}" 
                   value="${currentValue}" placeholder="${config.default}">
          `;
		      }
		      
		      const group = document.createElement('div');
		      group.className = 'fb-settings-group';
		      group.innerHTML = `
        <label class="fb-settings-label">${setting.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</label>
        ${inputField}
        <div class="fb-settings-description">${config.description}</div>
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
          <select class="fb-settings-input fb-form-param" data-param="${param}">
            ${config.options.map(opt => 
	              `<option value="${opt}" ${currentValue === opt ? 'selected' : ''}>${opt}</option>`
	            ).join('')}
          </select>
        `;
		      } else if (config.type === 'checkbox') {
		        inputField = `
          <label class="fb-checkbox-label">
            <input type="checkbox" class="fb-form-param" data-param="${param}" ${currentValue ? 'checked' : ''}>
            <span>${config.description}</span>
          </label>
        `;
		      } else {
		        inputField = `
          <input type="text" class="fb-settings-input fb-form-param" data-param="${param}" 
                 value="${currentValue}" placeholder="${config.default}">
        `;
		      }
		      
		      const group = document.createElement('div');
		      group.className = 'fb-settings-group';
		      group.innerHTML = `
        <label class="fb-settings-label">${param.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</label>
        ${inputField}
        <div class="fb-settings-description">${config.description}</div>
      `;
		      
		      paramsContainer.appendChild(group);
		    });
		    
		    // Add event listeners
		    this.container.querySelectorAll('.fb-form-setting').forEach(input => {
		      input.addEventListener('change', (e) => {
		        const setting = e.target.dataset.setting;
		        let value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
		        this.formData.form.settings[setting] = value;
		        this.updateFormiqueOutput();
		      });
		    });
		    
		    this.container.querySelectorAll('.fb-form-param').forEach(input => {
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
		    const fieldName = type ? this.generateFieldName(type) : 'Delete this and type @ to select input type';
		    
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
		      addBlockDiv.className = 'fb-add-block-center';
		      addBlockDiv.innerHTML = `<button type="button" class="fb-add-block-btn" id="fb-addBlockCenter"><i class="fas fa-plus"></i></button>`;
		      this.elements.preview.appendChild(addBlockDiv);
		      
		      addBlockDiv.querySelector('#fb-addBlockCenter').addEventListener('click', () => {
		        this.addFormBlock();
		      });
		      return;
		    }
		    
		    this.elements.emptyState.style.display = 'none';
		    
		    this.formData.fields.forEach((field, index) => {
		      const block = document.createElement('div');
		      block.className = 'fb-form-block';
		      block.dataset.id = field.id;
		      
		      const config = this.formConfig.form_input_types[field.type] || this.formConfig.form_input_types.text;
		      const icon = config.icon || 'fas fa-question-circle';
		      
		      const fieldNameDisplay = field.required ? `${field.name}*` : field.name;
		      
		      block.innerHTML = `
        <div class="fb-drag-handle">
          <i class="fas fa-grip-vertical"></i>
        </div>
        <button type="button" class="fb-add-element-btn" data-index="${index}">
          <i class="fas fa-plus"></i>
        </button>
        <div class="fb-input-area">
          <input type="text" class="fb-input-main" placeholder=" " value="${fieldNameDisplay}">
          <div class="fb-placeholder-text">${field.placeholder || ''}</div>
          <div class="fb-dropdown">
            ${Object.entries(this.formConfig.form_input_types).map(([key, config]) => `
              <div class="fb-dropdown-item" data-type="${key}">
                <div class="fb-dropdown-icon"><i class="${config.icon}"></i></div>
                <div class="fb-dropdown-name">${config.display_name}</div>
              </div>
            `).join('')}
          </div>
        </div>
        <div class="fb-block-controls">
          <label class="fb-required-toggle">
            <input type="checkbox" ${field.required ? 'checked' : ''}>
            <span>Required </span>
          </label>
          <button type="button" class="fb-control-btn fb-options-btn">
            <i class="fas fa-cog"></i>
          </button>
          <button type="button" class="fb-control-btn fb-delete-btn">
            <i class="fas fa-trash"></i>
          </button>
          <div class="fb-type-indicator">
            <i class="${icon}"></i>
          </div>
        </div>
      `;
		      
		      this.elements.preview.appendChild(block);
		      
		      const input = block.querySelector('.fb-input-main');
		      const dropdown = block.querySelector('.fb-dropdown');
		      const addBtn = block.querySelector('.fb-add-element-btn');
		      const deleteBtn = block.querySelector('.fb-delete-btn');
		      const optionsBtn = block.querySelector('.fb-options-btn');
		      const requiredToggle = block.querySelector('input[type="checkbox"]');
		      
		      input.addEventListener('focus', () => {
		        block.classList.add('fb-selected');
		      });
		      
		      input.addEventListener('blur', () => {
		        block.classList.remove('fb-selected');
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
		              const newInput = newBlock.querySelector('.fb-input-main');
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
		    addBlockDiv.className = 'fb-add-block-center';
		    addBlockDiv.innerHTML = `<button type="button" class="fb-add-block-btn" id="fb-addBlockCenter"><i class="fas fa-plus"></i></button>`;
		    this.elements.preview.appendChild(addBlockDiv);
		    
		    addBlockDiv.querySelector('#fb-addBlockCenter').addEventListener('click', () => {
		      this.addFormBlock();
		    });
		    
		    this.container.querySelectorAll('.fb-dropdown-item').forEach(item => {
		      item.addEventListener('click', () => {
		        const type = item.dataset.type;
		        const fieldId = item.closest('.fb-form-block')?.dataset.id;
		        if (fieldId) {
		          this.updateFieldType(fieldId, type);
		          const block = item.closest('.fb-form-block');
		          if (block) {
		            const config = this.formConfig.form_input_types[type];
		            const iconElement = block.querySelector('.fb-type-indicator i');
		            if (iconElement && config) {
		              iconElement.className = config.icon || 'fas fa-question-circle';
		            }
		          }
		          this.hideAllDropdowns();
		        }
		      });
		    });
		  }

		  showDropdown(dropdown, fieldId) {
		    this.hideAllDropdowns();
		    dropdown.classList.add('fb-active');
		    this.currentInput = fieldId;
		  }

		  hideDropdown(dropdown) {
		    if (dropdown) {
		      dropdown.classList.remove('fb-active');
		    }
		  }

		  hideAllDropdowns() {
		    this.container.querySelectorAll('.fb-dropdown').forEach(dropdown => {
		      dropdown.classList.remove('fb-active');
		    });
		  }

		  showModal(index) {
		    this.elements.modalOverlay.classList.add('fb-active');
		    this.currentInput = index;
		    
		    const firstItem = this.container.querySelector('.fb-element-item');
		    if (firstItem) {
		      this.setActiveElement(firstItem.dataset.type);
		    }
		  }

		  hideModal() {
		    this.elements.modalOverlay.classList.remove('fb-active');
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
		    
		    this.elements.optionsModal.classList.add('fb-active');
		    
		    this.makeDraggable(this.elements.optionsModal);
		  }

		  hideOptionsModal() {
		    this.elements.optionsModal.classList.remove('fb-active');
		    this.currentOptionsField = null;
		  }

		  makeDraggable(element) {
		    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
		    const header = element.querySelector('.fb-modal-header');
		    
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
		    
		    this.elements.toast.classList.add('fb-active');
		    setTimeout(() => {
		      this.elements.toast.classList.remove('fb-active');
		      this.deletedField = null;
		    }, 5000);
		  }

		  generateOptionsContent(field) {
		    const fieldConfig = this.formConfig.form_input_types[field.type];
		    this.elements.optionsModalContent.innerHTML = '';
		    
		    // 1. ADD FIELD-SPECIFIC VALIDATIONS FIRST
		    const specificAccordion = document.createElement('div');
		    specificAccordion.className = 'fb-option-group';
		    
		    let specificContent = '';
		    
		    if (fieldConfig.validation) {
		      Object.keys(fieldConfig.validation).forEach(validationRule => {
		        if (validationRule === 'required') return;
		        
		        const validationConfig = fieldConfig.validation[validationRule];
		        const currentValue = field.attributes.validation && field.attributes.validation[validationRule] !== undefined 
		          ? field.attributes.validation[validationRule] 
		          : validationConfig;
		        
		        if (typeof validationConfig === 'boolean') {
		          specificContent += `
            <div class="fb-checkbox-label">
              <input type="checkbox" class="fb-option-checkbox" id="fb-option_${validationRule}" 
                     ${currentValue ? 'checked' : ''}>
              <label for="fb-option_${validationRule}">${validationRule.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</label>
            </div>
          `;
		        } else if (Array.isArray(validationConfig)) {
		          const arrayValue = Array.isArray(currentValue) ? currentValue.join(', ') : currentValue;
		          
		          if (validationRule === 'options' && field.type === 'dynamicSingleSelect') {
		            specificContent += `
              <div class="fb-option-group">
                <label class="fb-option-label" for="fb-option_${validationRule}">Parent Options</label>
                <input type="text" class="fb-option-input" id="fb-option_${validationRule}" 
                       value="${arrayValue}" placeholder="South Africa, Zimbabwe, Canada">
                <small>Comma-separated parent values</small>
              </div>
              <div class="fb-option-group">
                <button type="button" type="button" class="fb-control-btn" id="fb-buildChildOptions" 
                        style="padding: 6px 12px; font-size: 12px;">
                  <i class="fas fa-plus"></i> Configure Child Options
                </button>
              </div>
            `;
		          } else {
		            specificContent += `
              <div class="fb-option-group">
                <label class="fb-option-label" for="fb-option_${validationRule}">${validationRule.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</label>
                <input type="text" class="fb-option-input" id="fb-option_${validationRule}" 
                       value="${arrayValue}" placeholder="Comma separated values">
              </div>
            `;
		          }
		        } else if (typeof validationConfig === 'object' && validationConfig !== null) {
		          Object.keys(validationConfig).forEach(subRule => {
		            const subInputId = `fb-option_${validationRule}_${subRule}`;
		            const subCurrentValue = field.attributes.validation && 
		                                   field.attributes.validation[validationRule] && 
		                                   field.attributes.validation[validationRule][subRule] !== undefined 
		              ? field.attributes.validation[validationRule][subRule] 
		              : validationConfig[subRule];
		            
		            if (typeof validationConfig[subRule] === 'boolean') {
		              specificContent += `
                <div class="fb-checkbox-label">
                  <input type="checkbox" class="fb-option-checkbox" id="${subInputId}" 
                         ${subCurrentValue ? 'checked' : ''}>
                  <label for="${subInputId}">${subRule.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</label>
                </div>
              `;
		            } else {
		              specificContent += `
                <div class="fb-option-group">
                  <label class="fb-option-label" for="${subInputId}">${subRule.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</label>
                  <input type="text" class="fb-option-input" id="${subInputId}" 
                         value="${subCurrentValue || ''}">
                </div>
              `;
		            }
		          });
		        } else {
		          const inputType = typeof validationConfig === 'number' ? 'number' : 'text';
		          specificContent += `
            <div class="fb-option-group">
              <label class="fb-option-label" for="fb-option_${validationRule}">${validationRule.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</label>
              <input type="${inputType}" class="fb-option-input" id="fb-option_${validationRule}" 
                     value="${currentValue !== null ? currentValue : ''}">
            </div>
          `;
		        }
		      });
		    }
		    
		    if (!specificContent) {
		      specificContent = '<div class="fb-option-group"><em>No specific validations for this field type</em></div>';
		    }
		    
		    specificAccordion.innerHTML = `
      <div class="fb-accordion-header" id="fb-specificHeader">
        <div class="fb-accordion-title">Field Specific Validations</div>
        <div class="fb-accordion-icon"><i class="fas fa-chevron-down"></i></div>
      </div>
      <div class="fb-accordion-content" id="fb-specificContent">
        ${specificContent}
      </div>
    `;
		    
		    this.elements.optionsModalContent.appendChild(specificAccordion);
		    
		    // 2. ADD CONDITIONAL LOGIC SECTION
		    const conditionalAccordion = document.createElement('div');
		    conditionalAccordion.className = 'fb-option-group';
		    
		    const conditionalLogic = this.getNestedValue(field.attributes, 'behavior_conditional_logic') || {
		      enabled: false,
		      dependsOn: '',
		      dependents: '',
		      condition_value: ''
		    };
		    
		    conditionalAccordion.innerHTML = `
      <div class="fb-accordion-header" id="fb-conditionalHeader">
        <div class="fb-accordion-title">Conditional Logic</div>
        <div class="fb-accordion-icon"><i class="fas fa-code-branch"></i></div>
      </div>
      <div class="fb-accordion-content" id="fb-conditionalContent">
        <div class="fb-option-group">
          <label class="fb-option-label">Depends On (This field shows when...)</label>
          <div style="display: flex; gap: 8px;">
            <input type="text" class="fb-option-input" id="fb-option_behavior_conditional_logic_dependsOn" 
                   value="${conditionalLogic.dependsOn || ''}" 
                   placeholder="parent_field,value" style="flex: 1;">
            <button type="button" type="button" class="fb-control-btn" id="fb-pickFieldBtn" 
                    style="padding: 6px 10px; font-size: 12px;">
              <i class="fas fa-list"></i> Pick Field
            </button>
          </div>
          <small>Format: field_name,value (e.g., gender,Female)</small>
        </div>
        
        <div class="fb-option-group">
          <label class="fb-option-label">Dependent Fields (Fields that show when this field equals...)</label>
          <div style="display: flex; gap: 8px;">
            <input type="text" class="fb-option-input" id="fb-option_behavior_conditional_logic_dependents" 
                   value="${conditionalLogic.dependents || ''}" 
                   placeholder="field1,field2" style="flex: 1;">
            <button type="button" type="button" class="fb-control-btn" id="fb-pickDependentsBtn"
                    style="padding: 6px 10px; font-size: 12px;">
              <i class="fas fa-list"></i> Pick Fields
            </button>
          </div>
          <small>Comma-separated field names</small>
        </div>
        
        <div class="fb-option-group">
          <label class="fb-option-label">Condition Value</label>
          <input type="text" class="fb-option-input" id="fb-option_behavior_conditional_logic_condition_value" 
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
		      categoryAccordion.className = 'fb-option-group';
		      
		      let categoryContentHTML = '';
		      const categoryAttrs = this.formConfig.universal_attributes[category];
		      
		      const generateAttributeInputs = (obj, prefix = '') => {
		        let html = '';
		        Object.keys(obj).forEach(attr => {
		          if (attr === 'required') return;
		          
		          const fullAttrName = prefix ? `${prefix}_${attr}` : attr;
		          const currentValue = this.getNestedValue(field.attributes, fullAttrName) !== undefined 
		            ? this.getNestedValue(field.attributes, fullAttrName) 
		            : obj[attr];
		          
		          let inputElement = '';
		          const defaultValue = obj[attr];
		          
		          if (typeof defaultValue === 'boolean') {
		            inputElement = `
              <div class="fb-checkbox-label">
                <input type="checkbox" class="fb-option-checkbox" id="fb-option_${fullAttrName}" 
                       ${currentValue ? 'checked' : ''}>
                <label for="fb-option_${fullAttrName}">${attr.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</label>
              </div>
            `;
		          } else if (typeof defaultValue === 'object' && defaultValue !== null && !Array.isArray(defaultValue)) {
		            html += `<div style="margin-left: 15px; border-left: 2px solid #e5e7eb; padding-left: 10px;">`;
		            html += `<div class="fb-option-label" style="margin-top: 10px;">${attr.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</div>`;
		            html += generateAttributeInputs(defaultValue, fullAttrName);
		            html += `</div>`;
		            return html;
		          } else {
		            inputElement = `
              <input type="text" class="fb-option-input" id="fb-option_${fullAttrName}" 
                     value="${currentValue}" placeholder="${defaultValue}">
            `;
		          }
		          
		          html += `
            <div class="fb-option-group">
              <label class="fb-option-label" for="fb-option_${fullAttrName}">${attr.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</label>
              ${inputElement}
            </div>
          `;
		        });
		        return html;
		      };
		      
		      categoryContentHTML = generateAttributeInputs(categoryAttrs);
		      
		      categoryAccordion.innerHTML = `
        <div class="fb-accordion-header" id="fb-universal_${category}Header">
          <div class="fb-accordion-title">${category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</div>
          <div class="fb-accordion-icon"><i class="fas fa-chevron-down"></i></div>
        </div>
        <div class="fb-accordion-content" id="fb-universal_${category}Content">
          ${categoryContentHTML}
        </div>
      `;
		      
		      this.elements.optionsModalContent.appendChild(categoryAccordion);
		    });
		    
		    // 4. SET UP ACCORDION BEHAVIOR
		    setTimeout(() => {
		      const conditionalHeader = this.container.querySelector('#fb-conditionalHeader');
		      const conditionalContent = this.container.querySelector('#fb-conditionalContent');
		      if (conditionalHeader && conditionalContent) {
		        conditionalHeader.addEventListener('click', () => {
		          const isActive = conditionalHeader.classList.toggle('fb-active');
		          conditionalContent.classList.toggle('fb-active', isActive);
		        });
		      }
		      
		      Object.keys(this.formConfig.universal_attributes).forEach(category => {
		        const header = this.container.querySelector(`#fb-universal_${category}Header`);
		        const content = this.container.querySelector(`#fb-universal_${category}Content`);
		        
		        if (header && content) {
		          header.addEventListener('click', () => {
		            const isActive = header.classList.toggle('fb-active');
		            content.classList.toggle('fb-active', isActive);
		          });
		        }
		      });

		      const specificHeader = this.container.querySelector('#fb-specificHeader');
		      const specificContent = this.container.querySelector('#fb-specificContent');
		      
		      if (specificHeader && specificContent) {
		        specificHeader.addEventListener('click', () => {
		          const isActive = specificHeader.classList.toggle('fb-active');
		          specificContent.classList.toggle('fb-active', isActive);
		        });
		      }
		      
		      // Field picker buttons
		      const pickFieldBtn = this.container.querySelector('#fb-pickFieldBtn');
		      const dependsOnInput = this.container.querySelector('#fb-option_behavior_conditional_logic_dependsOn');
		      const pickDependentsBtn = this.container.querySelector('#fb-pickDependentsBtn');
		      const dependentsInput = this.container.querySelector('#fb-option_behavior_conditional_logic_dependents');
		      
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
		      
		      // Dynamic select builder
		      const buildBtn = this.container.querySelector('#fb-buildChildOptions');
		      if (buildBtn) {
		        buildBtn.addEventListener('click', () => {
		          const parentInput = this.container.querySelector('#fb-option_options');
		          if (parentInput && parentInput.value.trim()) {
		            const parents = parentInput.value.split(',').map(p => p.trim()).filter(p => p);
		            
		            if (parents.length === 0) {
		              alert('Please enter at least one parent option');
		              return;
		            }
		            
		            const promptForChildOptions = (index) => {
		              if (index >= parents.length) {
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
		              
		              if (childOptions !== null) {
		                if (!field.attributes.validation) field.attributes.validation = {};
		                if (!field.attributes.validation.dynamic_options) field.attributes.validation.dynamic_options = {};
		                field.attributes.validation.dynamic_options[parent] = childOptions.split(',').map(c => c.trim()).filter(c => c);
		                
		                promptForChildOptions(index + 1);
		              }
		            };
		            
		            const createChildInputFields = () => {
		              const existingContainer = this.container.querySelector('#fb-childOptionsContainer');
		              if (existingContainer) {
		                existingContainer.remove();
		              }
		              
		              const container = document.createElement('div');
		              container.id = 'fb-childOptionsContainer';
		              container.style.marginTop = '10px';
		              
		              parents.forEach(parent => {
		                const safeId = parent.replace(/\s+/g, '_');
		                const childOptions = field.attributes.validation?.dynamic_options?.[parent] || [];
		                
		                container.innerHTML += `
                  <div class="fb-option-group" style="margin-left: 10px; border-left: 2px solid #e5e7eb; padding-left: 10px;">
                    <div style="display: flex; align-items: center; gap: 8px;">
                      <label class="fb-option-label" style="font-size: 12px; min-width: 100px;">${parent}:</label>
                      <input type="text" class="fb-option-input" 
                             id="fb-option_dynamic_${safeId}" 
                             value="${childOptions.join(', ')}"
                             placeholder="Child1, Child2" 
                             style="font-size: 12px; flex: 1;">
                    </div>
                  </div>
                `;
		              });
		              
		              buildBtn.parentNode.insertBefore(container, buildBtn.nextSibling);
		            };
		            
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
		    
		    if (!field.attributes) {
		      field.attributes = {
		        required: field.required,
		        name: field.name,
		        label: field.label || '',
		        validation: {}
		      };
		    }
		    
		    // Save conditional logic
		    const dependsOnInput = this.container.querySelector('#fb-option_behavior_conditional_logic_dependsOn');
		    const dependentsInput = this.container.querySelector('#fb-option_behavior_conditional_logic_dependents');
		    const conditionValueInput = this.container.querySelector('#fb-option_behavior_conditional_logic_condition_value');
		    const enabledInput = this.container.querySelector('#fb-option_behavior_conditional_logic_enabled');

		    if (dependsOnInput || dependentsInput || conditionValueInput) {
		        const dependsOn = dependsOnInput ? dependsOnInput.value.trim() : '';
		        const dependents = dependentsInput ? dependentsInput.value.trim() : '';
		        const conditionValue = conditionValueInput ? conditionValueInput.value.trim() : '';
		        const enabled = enabledInput ? enabledInput.checked : false;
		        
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

		    // Save dynamic select options
		    if (field.type === 'dynamicSingleSelect') {
		      if (!field.attributes.validation) {
		        field.attributes.validation = {};
		      }
		      
		      const parentInput = this.container.querySelector('#fb-option_options');
		      if (parentInput && parentInput.value.trim()) {
		        const parents = parentInput.value.split(',').map(p => p.trim()).filter(p => p);
		        field.attributes.validation.options = parents;
		        
		        const dynamicOptions = {};
		        parents.forEach(parent => {
		          const safeId = parent.replace(/\s+/g, '_');
		          const childInput = this.container.querySelector(`#fb-option_dynamic_${safeId}`);
		          if (childInput && childInput.value.trim()) {
		            dynamicOptions[parent] = childInput.value.split(',').map(c => c.trim()).filter(c => c);
		          }
		        });
		        
		        field.attributes.validation.dynamic_options = dynamicOptions;
		      }
		    }
		    
		    // Save universal attributes
		    Object.keys(this.formConfig.universal_attributes).forEach(category => {
		      this.saveCategoryAttributes(this.formConfig.universal_attributes[category], field.attributes, '');
		    });
		    
		    // Save field-specific validations
		    if (fieldConfig.validation && field.type !== 'dynamicSingleSelect') {
		      if (!field.attributes.validation) {
		        field.attributes.validation = {};
		      }
		      
		      Object.keys(fieldConfig.validation).forEach(validationRule => {
		        if (validationRule === 'required') return;
		        
		        const input = this.container.querySelector(`#fb-option_${validationRule}`);
		        
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
		              const subInput = this.container.querySelector(`#fb-option_${validationRule}_${subRule}`);
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
		    
		    this.cleanupEmptyValues(field.attributes);
		    this.updateFormiqueOutput();
		    this.renderFormPreview();
		    this.hideOptionsModal();
		  }

		  saveCategoryAttributes(categoryAttrs, targetObj, prefix) {
		    Object.keys(categoryAttrs).forEach(attr => {
		      if (attr === 'required') return;
		      
		      const fullAttrName = prefix ? `${prefix}_${attr}` : attr;
		      
		      if (fullAttrName === 'behavior_conditional_logic') {
		        return;
		      }
		      
		      const input = this.container.querySelector(`#fb-option_${fullAttrName}`);
		      
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
		    
		    Object.keys(this.formData.form.settings).forEach(setting => {
		      const value = this.formData.form.settings[setting];
		      const defaultValue = this.formSettingsConfig.form_settings[setting].default;
		      
		      if (value !== defaultValue && value !== '' && value !== false) {
		        const needsQuotes = typeof value === 'string' && value.includes(' ');
		        const formattedValue = needsQuotes ? `"${value}"` : value;
		        output += `    ${setting}: ${formattedValue}\n`;
		      }
		    });
		    
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
		    this.container.innerHTML = '';
		    this.elements = null;
		    this.formData = null;
		  }
		}

		// Export
		if (module.exports) {
		  module.exports = FormiqueBuilder;
		} else {
		  window.FormiqueBuilder = FormiqueBuilder;
		} 
	} (formiqueBuilder$1));

	var formiqueBuilderExports = formiqueBuilder$1.exports;
	var formiqueBuilder = /*@__PURE__*/getDefaultExportFromCjs(formiqueBuilderExports);

	return formiqueBuilder;

}));
//# sourceMappingURL=formique-builder.umd.js.map
