import { z } from 'zod';

const BusinessSchema = z.object({
  name: z.string().min(1, 'Nome do negócio é obrigatório'),
  legalName: z.string().optional(),
  description: z.string().optional(),
  phone: z.string().min(1, 'Telefone é obrigatório'),
  whatsapp: z.string().min(1, 'WhatsApp é obrigatório'),
  whatsappMessage: z.string().optional(),
  email: z.string().email('Email inválido'),
  address: z.string().min(1, 'Endereço é obrigatório'),
  hours: z.string().optional(),
  coordinates: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
});

const BrandingSchema = z.object({
  logo: z.any().optional(), // Can be string or imported image
  favicon: z.any().optional(),
  ogImage: z.string().optional(),
});

const ThemeSchema = z.object({
  primaryColor: z.string().regex(/^#[0-9A-F]{6}$/i, 'Cor primária deve ser hex válido'),
  secondaryColor: z.string().regex(/^#[0-9A-F]{6}$/i, 'Cor secundária deve ser hex válido').optional(),
  accentColor: z.string().regex(/^#[0-9A-F]{6}$/i, 'Cor de acentuação deve ser hex válido'),
  textColor: z.string().regex(/^#[0-9A-F]{6}$/i, 'Cor de texto deve ser hex válido').optional(),
  backgroundColor: z.string().regex(/^#[0-9A-F]{6}$/i, 'Cor de fundo deve ser hex válido').optional(),
  surfaceColor: z.string().regex(/^#[0-9A-F]{6}$/i, 'Cor de superfície deve ser hex válido').optional(),
  mutedColor: z.string().regex(/^#[0-9A-F]{6}$/i, 'Cor neutra deve ser hex válida').optional(),
  lineColor: z.string().regex(/^#[0-9A-F]{6}$/i, 'Cor de linha deve ser hex válida').optional(),
  fontPrimary: z.string().min(1, 'Fonte primária é obrigatória'),
  fontDisplay: z.string().min(1, 'Fonte de exibição é obrigatória'),
});

const SocialSchema = z.object({
  instagram: z.string().url().optional().or(z.literal('')),
  facebook: z.string().url().optional().or(z.literal('')),
  youtube: z.string().url().optional().or(z.literal('')),
  tiktok: z.string().url().optional().or(z.literal('')),
}).optional();

const SeoSchema = z.object({
  title: z.string().min(1, 'Título SEO é obrigatório'),
  description: z.string().min(1, 'Descrição SEO é obrigatória'),
  ogTitle: z.string().optional(),
  ogDescription: z.string().optional(),
  ogImage: z.string().optional(),
  locale: z.string().optional(),
  themeColor: z.string().regex(/^#[0-9A-F]{6}$/i, 'Cor de tema deve ser hex válida').optional(),
}).optional();

const NavigationSchema = z.array(z.object({
  label: z.string().min(1, 'Label de navegação é obrigatório'),
  href: z.string().min(1, 'Href de navegação é obrigatório'),
})).optional();

const FeaturesSchema = z.object({
  whatsappFloat: z.boolean().optional(),
  contactForm: z.boolean().optional(),
}).optional();

const ClientConfigSchema = z.object({
  business: BusinessSchema,
  branding: BrandingSchema,
  theme: ThemeSchema,
  social: SocialSchema,
  seo: SeoSchema,
  navigation: NavigationSchema,
  features: FeaturesSchema,
});

const ContentItemSchema = z.object({
  id: z.string(),
  title: z.string().optional(),
  description: z.string().optional(),
  image: z.any().optional(),
  content: z.any().optional(),
}).optional();

const ClientSchema = z.object({
  id: z.string().min(1, 'ID do cliente é obrigatório'),
  config: ClientConfigSchema,
  content: z.any(), // Content can have various structures
  sections: z.array(z.string()).min(1, 'Ao menos uma seção é obrigatória'),
});

export class ConfigValidationError extends Error {
  constructor(message, errors) {
    super(message);
    this.name = 'ConfigValidationError';
    this.errors = errors;
  }
}

export function validateClientConfig(client) {
  try {
    const validated = ClientSchema.parse(client);
    return {
      success: true,
      data: validated,
      errors: [],
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const formattedErrors = error.errors.map((err) => ({
        path: err.path.join('.'),
        message: err.message,
        type: err.code,
      }));

      return {
        success: false,
        data: null,
        errors: formattedErrors,
      };
    }

    return {
      success: false,
      data: null,
      errors: [{ message: error.message, type: 'UNKNOWN_ERROR' }],
    };
  }
}

export function validateConfigOrThrow(client) {
  const result = validateClientConfig(client);

  if (!result.success) {
    const errorMessages = result.errors
      .map((err) => `${err.path}: ${err.message}`)
      .join('\n');

    throw new ConfigValidationError(
      `Configuração de cliente inválida:\n${errorMessages}`,
      result.errors,
    );
  }

  return result.data;
}

export { ClientConfigSchema, ClientSchema };
