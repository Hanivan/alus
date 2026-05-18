<script lang="ts">
	import {
		CaretLeft,
		MagnifyingGlass,
		Folder,
		File,
		Gear,
		User,
		Moon,
		Sun,
		Terminal,
		ArrowsClockwise,
		Trash
	} from 'phosphor-svelte';
	import {
		CommandMenu,
		CommandMenuTrigger,
		CommandMenuContent,
		CommandMenuInput,
		CommandMenuList,
		CommandMenuItem,
		CommandMenuGroup,
		CommandMenuEmpty
	} from 'alus';

	let open = $state(false);
	let lastSelected = $state<string | null>(null);

	function handle(cmd: string) {
		lastSelected = cmd;
	}

	function onWindowKeydown(e: KeyboardEvent) {
		if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
			e.preventDefault();
			open = true;
		}
	}
</script>

<svelte:window onkeydown={onWindowKeydown} />

<svelte:head>
	<title>CommandMenu · Alus Components</title>
</svelte:head>

<a
	href="/"
	class="mb-8 inline-flex items-center gap-2 text-(--indigo-dye) transition-colors duration-300 hover:text-(--vermilion)"
>
	<CaretLeft class="h-5 w-5" />
	<span class="font-medium">Back to Components</span>
</a>

<main>
	<header class="mb-16">
		<div class="mb-6 flex items-center gap-6">
			<div class="hanko-seal">命</div>
			<div>
				<h1 class="font-display mb-2 text-5xl text-(--ink) md:text-6xl">CommandMenu</h1>
				<p class="tracking-widest text-(--bamboo)">命令</p>
			</div>
		</div>
		<p class="max-w-2xl text-xl text-(--charcoal)/70">
			Cmd+K command palette with search, groups, and keyboard nav (arrows, Enter, Esc).
		</p>
	</header>

	<section class="mb-16">
		<h2 class="font-display mb-8 text-2xl text-(--ink)">Open with ⌘K</h2>

		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<CommandMenu bind:open>
				<CommandMenuTrigger
					class="inline-flex items-center gap-3 rounded border border-(--indigo-dye)/30 bg-white px-4 py-2.5 text-(--charcoal) shadow-sm hover:border-(--vermilion)"
				>
					<MagnifyingGlass class="h-4 w-4 text-(--charcoal)/50" />
					<span class="text-(--charcoal)/50">Search commands...</span>
					<kbd
						class="rounded border border-(--charcoal)/20 bg-(--cream) px-2 py-0.5 font-mono text-xs text-(--charcoal)/70"
					>
						⌘K
					</kbd>
				</CommandMenuTrigger>

				<CommandMenuContent
					backdropClass="fixed inset-0 z-50 grid place-items-start justify-center bg-(--ink)/40 backdrop-blur-sm pt-[15vh]"
					class="w-full max-w-lg overflow-hidden rounded-lg border border-(--indigo-dye)/20 bg-white shadow-2xl"
					aria-label="Command menu"
				>
					<div
						class="flex items-center gap-3 border-b border-(--indigo-dye)/10 px-4 py-3"
					>
						<MagnifyingGlass class="h-4 w-4 text-(--charcoal)/50" />
						<CommandMenuInput
							class="flex-1 bg-transparent text-(--ink) placeholder:text-(--charcoal)/40 focus:outline-none"
							placeholder="Type a command or search... (try 設定, 暗)"
							debounceMs={150}
						/>
					</div>

					<CommandMenuList class="max-h-80 overflow-y-auto p-2">
						<CommandMenuEmpty class="p-6 text-center text-sm text-(--charcoal)/50">
							No commands found.
						</CommandMenuEmpty>

						<CommandMenuGroup class="mb-1">
							{#snippet children()}
								<div
									class="font-display px-2 py-1 text-xs tracking-widest text-(--bamboo) uppercase"
								>
									Files
								</div>
								<CommandMenuItem
									value="New file"
									keywords="create document 新規 ファイル 作成"
									onSelect={() => handle('New file')}
									class="flex cursor-pointer items-center gap-3 rounded px-3 py-2 text-sm transition-colors data-[highlighted]:bg-(--cream)"
								>
									<File class="h-4 w-4 text-(--indigo-dye)" />
									<span>New file</span>
									<kbd class="ml-auto font-mono text-xs text-(--charcoal)/50">⌘N</kbd>
								</CommandMenuItem>
								<CommandMenuItem
									value="Open folder"
									keywords="directory browse フォルダ 開く"
									onSelect={() => handle('Open folder')}
									class="flex cursor-pointer items-center gap-3 rounded px-3 py-2 text-sm transition-colors data-[highlighted]:bg-(--cream)"
								>
									<Folder class="h-4 w-4 text-(--indigo-dye)" />
									<span>Open folder</span>
									<kbd class="ml-auto font-mono text-xs text-(--charcoal)/50">⌘O</kbd>
								</CommandMenuItem>
							{/snippet}
						</CommandMenuGroup>

						<CommandMenuGroup>
							{#snippet children()}
								<div
									class="font-display px-2 py-1 text-xs tracking-widest text-(--bamboo) uppercase"
								>
									Account
								</div>
								<CommandMenuItem
									value="Profile"
									keywords="account user me プロフィール 自分"
									onSelect={() => handle('Profile')}
									class="flex cursor-pointer items-center gap-3 rounded px-3 py-2 text-sm transition-colors data-[highlighted]:bg-(--cream)"
								>
									<User class="h-4 w-4 text-(--indigo-dye)" />
									<span>View profile</span>
								</CommandMenuItem>
								<CommandMenuItem
									value="Settings"
									keywords="preferences config gear 設定 環境"
									onSelect={() => handle('Settings')}
									class="flex cursor-pointer items-center gap-3 rounded px-3 py-2 text-sm transition-colors data-[highlighted]:bg-(--cream)"
								>
									<Gear class="h-4 w-4 text-(--indigo-dye)" />
									<span>Settings</span>
									<kbd class="ml-auto font-mono text-xs text-(--charcoal)/50">⌘,</kbd>
								</CommandMenuItem>
							{/snippet}
						</CommandMenuGroup>

						<CommandMenuGroup>
							{#snippet children()}
								<div
									class="font-display px-2 py-1 text-xs tracking-widest text-(--bamboo) uppercase"
								>
									Theme
								</div>
								<CommandMenuItem
									value="Light theme"
									keywords="day bright sun 明るい 太陽 昼"
									onSelect={() => handle('Light theme')}
									class="flex cursor-pointer items-center gap-3 rounded px-3 py-2 text-sm transition-colors data-[highlighted]:bg-(--cream)"
								>
									<Sun class="h-4 w-4 text-(--muted-gold)" />
									<span>Switch to light</span>
								</CommandMenuItem>
								<CommandMenuItem
									value="Dark theme"
									keywords="night moon 暗い 夜 月"
									onSelect={() => handle('Dark theme')}
									class="flex cursor-pointer items-center gap-3 rounded px-3 py-2 text-sm transition-colors data-[highlighted]:bg-(--cream)"
								>
									<Moon class="h-4 w-4 text-(--indigo-dye)" />
									<span>Switch to dark</span>
								</CommandMenuItem>
							{/snippet}
						</CommandMenuGroup>

						<CommandMenuGroup>
							{#snippet children()}
								<div
									class="font-display px-2 py-1 text-xs tracking-widest text-(--bamboo) uppercase"
								>
									Actions
								</div>
								<CommandMenuItem
									value="Open terminal"
									keywords="shell command line cli 端末 ターミナル"
									onSelect={() => handle('Open terminal')}
									class="flex cursor-pointer items-center gap-3 rounded px-3 py-2 text-sm transition-colors data-[highlighted]:bg-(--cream)"
								>
									<Terminal class="h-4 w-4 text-(--indigo-dye)" />
									<span>Open terminal</span>
								</CommandMenuItem>
								<CommandMenuItem
									value="Reload"
									keywords="refresh restart 更新 再読み込み"
									onSelect={() => handle('Reload')}
									class="flex cursor-pointer items-center gap-3 rounded px-3 py-2 text-sm transition-colors data-[highlighted]:bg-(--cream)"
								>
									<ArrowsClockwise class="h-4 w-4 text-(--indigo-dye)" />
									<span>Reload window</span>
								</CommandMenuItem>
								<CommandMenuItem
									value="Clear cache"
									keywords="delete trash purge 削除 消去 ゴミ箱"
									onSelect={() => handle('Clear cache')}
									class="flex cursor-pointer items-center gap-3 rounded px-3 py-2 text-sm transition-colors data-[highlighted]:bg-(--cream)"
								>
									<Trash class="h-4 w-4 text-(--vermilion)" />
									<span>Clear cache</span>
								</CommandMenuItem>
							{/snippet}
						</CommandMenuGroup>
					</CommandMenuList>
				</CommandMenuContent>
			</CommandMenu>

			{#if lastSelected}
				<p class="mt-6 text-sm text-(--charcoal)/60">
					Selected: <code class="text-(--vermilion)">{lastSelected}</code>
				</p>
			{/if}
		</div>
	</section>
</main>
