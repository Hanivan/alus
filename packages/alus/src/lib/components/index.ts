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
export { InputGroup, InputAddon } from './form/input-group/index.js';
export { Rating } from './form/rating/index.js';

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
export { Breadcrumb, BreadcrumbItem, BreadcrumbSeparator } from './navigation/breadcrumb/index.js';
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
export {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
	getCardContext,
	setCardContext
} from './display/card/index.js';
export type { CardContext } from './display/card/index.js';
export { Image } from './display/image/index.js';
export { List, ListItem } from './display/list/index.js';
export {
	DataList,
	DataListTerm,
	DataListDescription
} from './display/data-list/index.js';

// Overlay Components
export {
	Modal,
	ModalTrigger,
	ModalContent,
	ModalTitle,
	ModalDescription,
	ModalClose,
	getModalContext,
	setModalContext
} from './overlay/modal/index.js';
export type { ModalContext } from './overlay/modal/index.js';
export {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogTitle,
	DialogDescription,
	DialogClose
} from './overlay/dialog/index.js';
export {
	Drawer,
	DrawerTrigger,
	DrawerContent,
	DrawerTitle,
	DrawerDescription,
	DrawerClose
} from './overlay/drawer/index.js';
export type { DrawerSide } from './overlay/drawer/index.js';
export {
	Tooltip,
	TooltipTrigger,
	TooltipContent,
	getTooltipContext,
	setTooltipContext
} from './overlay/tooltip/index.js';
export type { TooltipContext } from './overlay/tooltip/index.js';
export {
	Popover,
	PopoverTrigger,
	PopoverContent,
	getPopoverContext,
	setPopoverContext
} from './overlay/popover/index.js';
export type { PopoverContext } from './overlay/popover/index.js';
export {
	Dropdown,
	DropdownTrigger,
	DropdownContent,
	DropdownItem,
	getDropdownContext,
	setDropdownContext
} from './overlay/dropdown/index.js';
export type { DropdownContext, DropdownItemEntry } from './overlay/dropdown/index.js';

// Utility Components
export { VisuallyHidden } from './utility/visually-hidden/index.js';
export { Portal } from './utility/portal/index.js';
export { FocusTrap } from './utility/focus-trap/index.js';
