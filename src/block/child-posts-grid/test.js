// Toolbar option group for the main layout settings.
const viewOptions = [
	[
		{
			icon: <ListIcon />,
			title: __( 'View as a List', 'post-type-archive-mapping' ),
			isActive: 'list' === view,
			onClick: () => setAttributes( { view: 'list' } ),
		},
	],
	[
		{
			icon: <GridIcon />,
			title: __( 'View as a Grid', 'post-type-archive-mapping' ),
			isActive: 'grid' === view,
			onClick: () => setAttributes( { view: 'grid' } ),
		},
	],
	[
		{
			icon: <ColumnsIcon />,
			title: __( 'View as Columns', 'post-type-archive-mapping' ),
			isActive: 'columns' === view,
			onClick: () => setAttributes( { view: 'columns' } ),
		},
	],
	[
		{
			icon: <FullIcon />,
			title: __( 'View as Full Content', 'post-type-archive-mapping' ),
			isActive: 'full' === view,
			onClick: () => setAttributes( { view: 'full' } ),
		},
	],
];

// Toolbar option group for the main layout settings.
const listStyleOptions = [
	[
		{
			icon: <UnorderedListIcon />,
			title: __( 'Unordered List', 'post-type-archive-mapping' ),
			isActive: 'ul' === listStyle,
			onClick: () => setAttributes( { listStyle: 'ul' } ),
		},
	],
	[
		{
			icon: <OrderedListIcon />,
			title: __( 'Numbered List', 'post-type-archive-mapping' ),
			isActive: 'ol' === listStyle,
			onClick: () => setAttributes( { listStyle: 'ol' } ),
		},
	],
	[
		{
			icon: <FormatTextLeftIcon />,
			title: __( 'No List', 'post-type-archive-mapping' ),
			isActive: 'none' === listStyle,
			onClick: () => setAttributes( { listStyle: 'none' } ),
		},
	],
];


const toolbar = (
	<BlockControls>
		<>
			<ToolbarGroup
				isCollapsed={ true }
				icon={ selectedView() }
				label={ __(
					'Change the layout of the hierarchy.',
					'post-type-archive-mapping'
				) }
				controls={ viewOptions }
			/>
		</>
		{ 'list' === view && (
			<>
				<ToolbarGroup
					isCollapsed={ false }
					label={ __(
						'Change the list appearance.',
						'post-type-archive-mapping'
					) }
					controls={ listStyleOptions }
				/>
			</>
		) }
	</BlockControls>
);
