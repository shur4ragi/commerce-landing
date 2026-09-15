import { getActiveClient } from '../config';

const content = getActiveClient().content;

export default content;

export const services = content.services?.items || [];
export const products = content.products?.items || [];
export const gallery = content.gallery?.items || [];
export const highlights = content.highlights?.items || [];
export const testimonials = content.testimonials?.items || [];
