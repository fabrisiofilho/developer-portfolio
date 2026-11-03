import { useTranslation } from '../i18n/I18nProvider';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

interface ProjectFiltersProps {
    query: string;
    onQueryChange: (value: string) => void;
    technologyFilter: string;
    onTechnologyChange: (value: string) => void;
    technologies: string[];
}

export function ProjectFilters({
    query,
    onQueryChange,
    technologyFilter,
    onTechnologyChange,
    technologies,
}: ProjectFiltersProps) {
    const { t } = useTranslation();
    return (
        <div className="project-filters">
            <label className="search-field" htmlFor="project-search">
                <span className="filter-label">{t.search}</span>
                <span className="search-box">
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        aria-hidden="true"
                    >
                        <circle cx="10.5" cy="10.5" r="6.5" />
                        <path d="m16 16 4 4" />
                    </svg>
                    <input
                        id="project-search"
                        type="search"
                        placeholder={t.searchHint}
                        value={query}
                        onChange={(event) => onQueryChange(event.target.value)}
                    />
                </span>
            </label>
            <div className="technology-field">
                <label
                    className="filter-label"
                    id="technology-label"
                    htmlFor="technology-select"
                >
                    {t.technology}
                </label>
                <Select
                    id="technology-select"
                    labelId="technology-label"
                    value={technologyFilter}
                    onChange={(event) => onTechnologyChange(event.target.value)}
                    displayEmpty
                    fullWidth
                    sx={{
                        height: 48,
                        color: '#eeeef0',
                        backgroundColor: '#191c18',
                        borderRadius: '10px',
                        fontFamily: 'inherit',
                        fontSize: 13,
                        '& .MuiSelect-select': {
                            padding: '12px 16px',
                            display: 'flex',
                            alignItems: 'center',
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#363d31',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#657454',
                        },
                        '&.Mui-focused': { boxShadow: '0 0 0 3px #c4f56b12' },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#8da66d',
                            borderWidth: 1,
                        },
                        '& .MuiSelect-icon': {
                            color: '#a3b195',
                            right: 12,
                            fontSize: 21,
                        },
                    }}
                    MenuProps={{
                        PaperProps: {
                            sx: {
                                marginTop: '8px',
                                backgroundImage: 'none',
                                backgroundColor: '#1c2119',
                                color: '#e4eadc',
                                border: '1px solid #3d4833',
                                borderRadius: '12px',
                                padding: '5px',
                                boxShadow: '0 16px 40px #0007',
                                maxHeight: 320,
                                '& .MuiList-root': { padding: 0 },
                                '& .MuiMenuItem-root': {
                                    fontFamily: 'inherit',
                                    fontSize: 13,
                                    minHeight: 42,
                                    borderRadius: '7px',
                                    padding: '10px 12px',
                                    margin: '2px 0',
                                    justifyContent: 'space-between',
                                },
                                '& .MuiMenuItem-root:hover, & .MuiMenuItem-root.Mui-focusVisible':
                                    { backgroundColor: '#303d25' },
                                '& .MuiMenuItem-root.Mui-selected': {
                                    backgroundColor: '#c4f56b16',
                                    color: '#c4f56b',
                                },
                                '& .MuiMenuItem-root.Mui-selected:hover, & .MuiMenuItem-root.Mui-selected.Mui-focusVisible':
                                    { backgroundColor: '#c4f56b25' },
                            },
                        },
                    }}
                >
                    {technologies.map((item) => (
                        <MenuItem key={item} value={item}>
                            <span>{!item ? t.allTechnologies : item}</span>
                            {technologyFilter === item && (
                                <span
                                    className="option-check"
                                    aria-hidden="true"
                                >
                                    ✓
                                </span>
                            )}
                        </MenuItem>
                    ))}
                </Select>
            </div>
        </div>
    );
}
