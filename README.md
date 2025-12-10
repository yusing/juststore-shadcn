# juststore-shadcn

Shadcn UI components wrappers for juststore to reduce the boilerplate code.

## Components

### Checkbox

- `StoreCheckboxField` - Checkbox field component
- `StoreFormCheckboxField` - Checkbox field component with automatic error handling

### Error

- `StoreError` - Error display component

### FieldContent

- `StoreFieldContent` - Field content wrapper component

### Input

- `StoreInputField` - Input field component
- `StoreFormInputField` - Input field component with automatic error handling
- `StorePasswordField` - Password input field component
- `StoreFormPasswordField` - Password input field component with automatic error handling

### Label

- `StoreLabel` - Label component

### Radio

- `StoreRadioField` - Radio button group field component
- `StoreFormRadioField` - Radio button group field component with automatic error handling

### Select

- `StoreSelectField` - Select dropdown field component
- `StoreFormSelectField` - Select dropdown field component with automatic error handling

## Installation

Copy what you need from `src/components/store` to your project `components/store` directory.

## Quick Start

### Basic Form Setup

```tsx
import { useForm } from 'juststore'
import { StoreFormInputField } from '@/components/store/Input'
import { StoreFormCheckboxField } from '@/components/store/Checkbox'
import { StoreFormRadioField } from '@/components/store/Radio'

function MyForm() {
  const form = useForm({
    name: '',
    email: '',
    age: 18,
    theme: 'light',
    newsletter: false
  })

  return (
    <form
      onSubmit={form.handleSubmit(data => {
        console.log('Form submitted:', data)
      })}
    >
      <StoreFormInputField state={form.name} />
      <StoreFormInputField state={form.email} type="email" />
      <StoreFormInputField state={form.age} type="number" />
      <StoreFormRadioField state={form.theme} options={['light', 'dark']} />
      <StoreFormCheckboxField state={form.newsletter} />
      <button type="submit">Submit</button>
    </form>
  )
}
```

### Examples

#### Input Fields

```tsx
import { useForm } from 'juststore'
import { StoreFormInputField, StoreFormPasswordField } from '@/components/store/Input'

function MyForm() {
  const form = useForm({
    username: '',
    password: '',
    port: 8080
  })

  return (
    <>
      {/* Basic input */}
      <StoreFormInputField state={form.username} />

      {/* With custom title and orientation */}
      <StoreFormInputField
        state={form.username}
        title="Username"
        orientation="horizontal"
        labelProps={{ className: 'min-w-[120px]' }}
      />

      {/* Number input */}
      <StoreFormInputField state={form.port} type="number" orientation="horizontal" />

      {/* Password field with visibility toggle */}
      <StoreFormPasswordField state={form.password} />
    </>
  )
}
```

#### Checkbox Fields

```tsx
import { useForm, useMemoryStore } from 'juststore'
import { StoreFormCheckboxField, StoreCheckboxField } from '@/components/store/Checkbox'

function MyForm() {
  const form = useForm({ acceptTerms: false })
  const settings = useMemoryStore({ enableNotifications: true })

  return (
    <>
      {/* Form checkbox (with automatic error handling) */}
      <StoreFormCheckboxField
        state={form.acceptTerms}
        title="Accept Terms"
        description="I agree to the terms and conditions"
      />

      {/* Regular checkbox (for non-form state) */}
      <StoreCheckboxField
        state={settings.enableNotifications}
        title="Enable Notifications"
        description="Receive notifications about updates"
        descriptionVariant="tooltip"
      />
    </>
  )
}
```

#### Radio Fields

```tsx
import { useForm } from 'juststore'
import { StoreFormRadioField } from '@/components/store/Radio'

function MyForm() {
  const form = useForm({ containerRuntime: 'docker' })

  return (
    <>
      {/* Simple options array */}
      <StoreFormRadioField
        state={form.containerRuntime}
        title="Runtime"
        options={['docker', 'podman']}
        orientation="horizontal"
      />

      {/* With icons and labels */}
      <StoreFormRadioField
        state={form.containerRuntime}
        title="Runtime"
        options={[
          { label: 'Docker', value: 'docker', icon: DockerIcon },
          { label: 'Podman', value: 'podman', icon: PodmanIcon }
        ]}
        orientation="horizontal"
      />
    </>
  )
}
```

#### Select Fields

```tsx
import { useForm } from 'juststore'
import { StoreFormSelectField } from '@/components/store/Select'

function MyForm() {
  const form = useForm({ country: '' })

  return (
    <StoreFormSelectField
      state={form.country}
      title="Country"
      options={[
        { label: 'United States', value: 'us' },
        { label: 'Canada', value: 'ca' },
        { label: 'United Kingdom', value: 'uk' }
      ]}
      placeholder="Select a country"
    />
  )
}
```

#### Field Groups

```tsx
import { FieldGroup } from '@/components/ui/field'
import { StoreFormInputField } from '@/components/store/Input'
import { StoreFormCheckboxField } from '@/components/store/Checkbox'

function MyForm() {
  const form = useForm({
    name: '',
    email: '',
    newsletter: false
  })

  return (
    <FieldGroup className="gap-4">
      <StoreFormInputField state={form.name} orientation="horizontal" />
      <StoreFormInputField state={form.email} orientation="horizontal" />
      <StoreFormCheckboxField state={form.newsletter} />
    </FieldGroup>
  )
}
```

## License

AGPL-3.0
