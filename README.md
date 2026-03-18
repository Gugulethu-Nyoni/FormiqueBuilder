# Formique Builder - Documentation

## Getting Started

### Creating Your First Input Field
1. Click the **blue plus button** (+) to add a new input field
2. In the new input field, you'll see placeholder text: **"Delete this and type @ to select input type"**
3. Delete this text and type **@** to display the dropdown menu of available input types
4. Select the appropriate input type:
   - Select **Text** for a first name, last name, or any single-line text input
   - Select **Email** for email address input with built-in validation
   - Select **Number** for numeric values
   - Select **Password** for password input with masking
   - Select **Telephone** for phone numbers
   - And many more...

## Input Field Controls

Each input field comes with a set of controls on the right-hand side:

### 1. Required Checkbox
- Toggle this checkbox to mark the field as **required**
- Required fields will display an asterisk (*) next to the field name

### 2. Settings Gear Icon ⚙️
Click the gear icon to open the **Input Options Dialog**, which contains comprehensive configuration settings:

#### Field Specific Validations
- Configure validation rules specific to the selected input type
- Examples: min/max length, pattern matching, step values for numbers

#### Conditional Logic
- Set up dynamic field visibility based on values entered in other fields
- See the "Conditional Fields" section below for detailed examples

#### Common
- **Disabled**: Prevent user interaction with the field
- **Readonly**: Field value can be viewed but not edited
- **Placeholder**: Hint text displayed inside the input
- **Help Text**: Additional guidance displayed near the field
- **Label**: Custom label for the field
- **Name**: Field identifier (used in form submission)
- **ID**, **Class**, **Style**: HTML attributes for styling and scripting
- **Value**: Default value for the field

#### Accessibility
- ARIA attributes for screen readers and assistive technologies
- Tab index for keyboard navigation

#### Behavior
- **Autofocus**: Automatically focus this field when the form loads
- **Autocomplete**: Enable/disable browser autocomplete
- **Visibility**: Control field visibility and conditional display

#### Styling
- Width, responsive settings, custom CSS
- Size variants (small, medium, large)
- Visual variants and themes

#### Data
- Default values, data sources
- Validation and success messages
- Data binding options

#### Events
- JavaScript event handlers (onChange, onFocus, onBlur, onInput, onClick)

### 3. Save Button
After configuring field options, click the **Save** button in the top-right corner of the Input Options Dialog. Changes will immediately reflect:
- In the input block itself
- In the **Low Code Output** panel on the right side of the form builder

### 4. Trash Icon 🗑️
- Click the trash icon to delete a field you no longer need
- A toast notification will appear with an **Undo** option for 5 seconds

## Conditional Fields

Conditional fields allow you to show or hide fields based on values entered in other fields. For example, showing pregnancy-related questions only when "Female" is selected as gender.

### Method 1: Using the Drag-and-Drop UI

1. Create your parent field (e.g., Gender dropdown) and child field (e.g., Pregnancy Details)
2. Click the **settings gear icon** on the **parent field**
3. In the Input Options Dialog, navigate to the **Conditional Logic** section
4. In the **Dependent Fields** area, you have two options:
   - **Type field names manually**: Enter comma-separated field names (e.g., `pregnancy-details, maternity-notes`)
   - **Click "Pick Field"**: An alert will display a list of available fields. Type the name of the dependent field(s) when prompted

### Method 2: Using Low Code Syntax

You can also configure conditional logic directly in the Low Code output:

```
-gender*:singleSelect
  options: female,male
  dependents: pregnancy-details

-pregnancy-details*:textarea
  dependsOn: gender,female
```

**Alternative syntax:**
```
-pregnancy-details*:textarea
  dependsOn: gender
  condition: female
```

In both examples, the `pregnancy-details` field will only be displayed when the selected value in the `gender` field is "female".

## Dynamic Selects (Cascading Dropdowns)

Dynamic selects are perfect for scenarios like Country-State dependencies, where the options in one dropdown depend on the selection in another.

### Example: Country-State Dropdown

```
-Country-State*:dynamicSingleSelect
  options: South Africa, Canada
  South Africa: Eastern Cape, Free State, Gauteng, KwaZulu-Natal, Limpopo, Mpumalanga, North West, Northern Cape, Western Cape
  Canada: Alberta, British Columbia, Manitoba, New Brunswick, Newfoundland and Labrador, Nova Scotia, Ontario, Prince Edward Island, Quebec, Saskatchewan, Northwest Territories, Nunavut, Yukon
```

### How to Create Dynamic Selects via UI:

1. Click the **blue plus button** (+) to add a new input field
2. Delete the placeholder text and type **@** to display input types
3. Select **Dynamic Select** from the dropdown
4. Click the **settings gear icon** on the new field
5. In the Input Options Dialog, go to **Field Specific Validations**
6. Enter **parent options** as comma-separated values (e.g., `Canada, South Africa`)
7. Click **"+ Configure Child Options"**
8. For each parent option, an alert will prompt you to enter child options as comma-separated values
   - For "South Africa": `Eastern Cape, Free State, Gauteng, KwaZulu-Natal, Limpopo, Mpumalanga, North West, Northern Cape, Western Cape`
   - For "Canada": `Alberta, British Columbia, Manitoba, New Brunswick, Newfoundland and Labrador, Nova Scotia, Ontario, Prince Edward Island, Quebec, Saskatchewan, Northwest Territories, Nunavut, Yukon`
9. Click **Save** to apply the configuration

## Low Code Output Panel

The right-hand panel displays the **Formique Low Code syntax** representation of your form. This panel is editable, allowing you to:

- View the current form structure in real-time
- Manually edit the syntax for advanced configurations
- Copy the output for use in other applications
- Paste existing Formique syntax to quickly build forms

### Copy Button
Click the **Copy** button to copy the entire Low Code output to your clipboard.

**Pro Tip**: Familiarity with Formique Low Code syntax gives you greater control and efficiency when building complex forms with advanced conditional logic and dynamic behaviors.