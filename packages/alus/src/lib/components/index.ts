/**
 * UI Components
 * @module components
 */

// Form Components
export { Button } from './form/button/index.js';
export { Input } from './form/input/index.js';
export { Checkbox } from './form/checkbox/index.js';
export { Radio } from './form/radio/index.js';
export { Textarea } from './form/textarea/index.js';
export {
	Select,
	SelectTrigger,
	SelectContent,
	SelectOption,
	getSelectContext,
	setSelectContext
} from './form/select/index.js';
export type { SelectContext, SelectOptionEntry } from './form/select/index.js';
export { Fieldset } from './form/fieldset/index.js';
export { RadioGroup, getRadioGroup, setRadioGroup } from './form/radio-group/index.js';
export type { RadioGroupContext } from './form/radio-group/index.js';
export { Form } from './form/form/index.js';
export { FieldError } from './form/field-error/index.js';
export { Label } from './form/label/index.js';
export { Switch } from './form/switch/index.js';
export { Slider } from './form/slider/index.js';
export { FileInput } from './form/file-input/index.js';
export { SearchInput } from './form/search-input/index.js';
export { NumberInput } from './form/number-input/index.js';

// Navigation Components
export {
	Tabs,
	TabList,
	Tab,
	TabPanel,
	getTabsContext,
	setTabsContext
} from './navigation/tabs/index.js';
export type { TabsContext } from './navigation/tabs/index.js';
export {
	Accordion,
	AccordionItem,
	AccordionTrigger,
	AccordionContent,
	getAccordionRoot,
	setAccordionRoot,
	getAccordionItem,
	setAccordionItem
} from './navigation/accordion/index.js';
export type {
	AccordionRootContext,
	AccordionItemContext,
	AccordionType
} from './navigation/accordion/index.js';
export {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbSeparator
} from './navigation/breadcrumb/index.js';
export { Pagination } from './navigation/pagination/index.js';
export { Link } from './navigation/link/index.js';
export {
	Menu,
	MenuTrigger,
	MenuContent,
	MenuItem,
	getMenuContext,
	setMenuContext
} from './navigation/menu/index.js';
export type { MenuContext, MenuItemEntry } from './navigation/menu/index.js';

// Feedback Components
export { Badge } from './feedback/badge/index.js';
export { Tag } from './feedback/tag/index.js';
export { Spinner } from './feedback/spinner/index.js';
export { Skeleton } from './feedback/skeleton/index.js';
export { Progress } from './feedback/progress/index.js';
export { Alert } from './feedback/alert/index.js';

// Display Components
export { Divider } from './display/divider/index.js';
export { Avatar } from './display/avatar/index.js';

// Utility Components
export { VisuallyHidden } from './utility/visually-hidden/index.js';
export { Portal } from './utility/portal/index.js';
export { FocusTrap } from './utility/focus-trap/index.js';
