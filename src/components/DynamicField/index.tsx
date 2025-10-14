// components/DynamicField.tsx
import { useId, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { PhoneInput } from "@/components/ui/PhoneInput";
import { StepField } from "@/types/multistep";

interface DynamicFieldProps {
  field: StepField;
  value: string | string[];
  onChange: (value: string | string[]) => void;
}

export function DynamicField({ field, value, onChange }: DynamicFieldProps) {
  const id = useId();
  const [touched, setTouched] = useState(false);

  // Função auxiliar para verificar se tem erro
  const getFieldError = () => {
    if (!touched || !field.required) return undefined;

    if (field.type === "checkbox") {
      const selectedValues = Array.isArray(value) ? value : [];
      if (selectedValues.length === 0) {
        return "Selecione pelo menos uma opção";
      }
    } else if (field.type === "terms-checkbox") {
      if (value !== "accepted") {
        return "Você precisa aceitar os termos para continuar";
      }
    } else {
      // text, phone, textarea
      if (!value || value === "") {
        return field.label
          ? `${field.label} é obrigatório`
          : "Campo obrigatório";
      }
    }

    return undefined;
  };

  const errorMessage = getFieldError();
  const hasError = !!errorMessage;

  const renderCheckboxField = () => {
    const selectedValues = Array.isArray(value) ? value : [];

    const toggleOption = (optionValue: string, checked: boolean) => {
      setTouched(true);
      let newValues: string[];
      if (checked) {
        newValues = [...selectedValues, optionValue];
      } else {
        newValues = selectedValues.filter((v) => v !== optionValue);
      }
      onChange(newValues);
    };

    return (
      <fieldset className="space-y-2">
        <div className="gap-0 -space-y-px rounded-md shadow-xs">
          {field.options?.map((option, i) => {
            const inputId = `${id}-${option.value}`;
            const checked = selectedValues.includes(option.value);

            return (
              <div
                key={option.value}
                className={[
                  "relative flex flex-col gap-4 border p-4 outline-none",
                  "border-input first:rounded-t-md last:rounded-b-md",
                  "has-[[data-state=checked]]:border-primary/50",
                  "has-[[data-state=checked]]:bg-accent",
                  "has-[[data-state=checked]]:z-10",
                  i > 0 ? "-mt-px" : "",
                ].join(" ")}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id={inputId}
                      checked={checked}
                      onCheckedChange={(checked) =>
                        toggleOption(option.value, checked === true)
                      }
                      className="after:absolute after:inset-0"
                      value={option.value}
                    />
                    <Label
                      className="inline-flex items-start"
                      htmlFor={inputId}
                    >
                      {option.label}
                      {option.badge && (
                        <Badge className="ms-2 -mt-1">{option.badge}</Badge>
                      )}
                    </Label>
                  </div>
                  {option.price && (
                    <div className="text-muted-foreground text-xs">
                      {option.price}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        {hasError && (
          <p className="text-sm text-destructive mt-1.5">{errorMessage}</p>
        )}
      </fieldset>
    );
  };

  const renderRadioField = () => {
    const selectedValue = typeof value === "string" ? value : "";

    return (
      <fieldset className="space-y-2">
        <RadioGroup
          value={selectedValue}
          onValueChange={(value) => onChange(value)}
          className="gap-0 -space-y-px rounded-md shadow-xs"
        >
          {field.options?.map((option) => {
            const inputId = `${id}-${option.value}`;

            return (
              <div
                key={option.value}
                className=" has-data-[state=checked]:bg-accent relative flex flex-col gap-4 border p-4 outline-none first:rounded-t-md last:rounded-b-md has-data-[state=checked]:z-10"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <RadioGroupItem
                      id={inputId}
                      value={option.value}
                      className="after:absolute after:inset-0"
                    />
                    <Label
                      className="inline-flex items-start"
                      htmlFor={inputId}
                    >
                      {option.label}
                      {option.badge && (
                        <Badge className="ms-2 -mt-1">{option.badge}</Badge>
                      )}
                    </Label>
                  </div>
                  {option.price && (
                    <div className="text-muted-foreground text-xs">
                      {option.price}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </RadioGroup>
      </fieldset>
    );
  };

  const renderTextField = () => (
    <div className="space-y-2">
      <Label htmlFor={`${id}-text`}>
        {field.label}
        {field.required && <span className="text-destructive ml-1">*</span>}
      </Label>
      <Input
        id={`${id}-text`}
        value={typeof value === "string" ? value : ""}
        onChange={(e) => onChange(e.target.value)}
        onBlur={() => setTouched(true)}
        placeholder={field.placeholder}
        required={field.required}
        aria-invalid={hasError || undefined}
        errorMessage={errorMessage}
      />
    </div>
  );

  const renderPhoneField = () => (
    <div className="space-y-2">
      <Label htmlFor={`${id}-phone`}>
        {field.label}
        {field.required && <span className="text-destructive ml-1">*</span>}
      </Label>
      <PhoneInput
        value={typeof value === "string" ? value : ""}
        onChange={(value) => {
          setTouched(true);
          onChange(value);
        }}
        placeholder={field.placeholder}
        required={field.required}
      />
      {hasError && (
        <p className="text-sm text-destructive mt-1.5">{errorMessage}</p>
      )}
    </div>
  );

  const renderTextareaField = () => (
    <div className="space-y-2">
      <Label htmlFor={`${id}-textarea`}>
        {field.label}
        {field.required && <span className="text-destructive ml-1">*</span>}
      </Label>
      <Textarea
        id={`${id}-textarea`}
        value={typeof value === "string" ? value : ""}
        onChange={(e) => onChange(e.target.value)}
        onBlur={() => setTouched(true)}
        placeholder={field.placeholder}
        required={field.required}
        rows={4}
        aria-invalid={hasError || undefined}
        className={
          hasError ? "border-destructive focus-visible:ring-destructive/20" : ""
        }
      />
      {hasError && (
        <p className="text-sm text-destructive mt-1.5">{errorMessage}</p>
      )}
    </div>
  );

  const renderTermsCheckboxField = () => {
    const isChecked = value === "accepted";
    const inputId = `${id}-terms`;

    return (
      <div className="space-y-2 pt-6">
        <div className="flex items-start gap-2">
          <Checkbox
            id={inputId}
            checked={isChecked}
            onCheckedChange={(checked) => {
              setTouched(true);
              onChange(checked === true ? "accepted" : "");
            }}
            required={field.required}
            className="mt-1 flex-shrink-0"
          />
          <Label
            htmlFor={inputId}
            className="text-sm text-gray-600 leading-relaxed cursor-pointer"
          >
            {field.termsText && <span>{field.termsText} </span>}
            {field.links?.map((link, index) => (
              <span key={index}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {link.text}
                </a>
                {index < (field.links?.length || 0) - 1 && (
                  <span className="sm:inline block"> e os </span>
                )}
              </span>
            ))}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </Label>
        </div>
        {hasError && (
          <p className="text-sm text-destructive ml-6">{errorMessage}</p>
        )}
      </div>
    );
  };

  switch (field.type) {
    case "checkbox":
      return renderCheckboxField();
    case "radio":
      return renderRadioField();
    case "text":
      return renderTextField();
    case "phone":
      return renderPhoneField();
    case "textarea":
      return renderTextareaField();
    case "terms-checkbox":
      return renderTermsCheckboxField();
    default:
      return null;
  }
}
