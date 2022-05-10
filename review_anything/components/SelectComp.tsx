import React from 'react'
import Select from 'react-select'
import { useRecoilState } from 'recoil';
import { theme } from '../atoms/themeAtom';
import { genres } from './../genres';
import postInterface from './../interfaces/Post';

const SelectComp: React.FC<{ type: string, post: postInterface, checkIsDisable: () => void }> = ({ type, post, checkIsDisable }) => {

    const [isDark] = useRecoilState(theme);

    const TypeOptions = [
        { value: 'Paid🤑', label: 'Paid🤑' },
        { value: 'Non-Paid✨', label: 'Non-Paid✨' },
        { value: 'Non-Paid(I swear)🔥', label: 'Non-Paid(I swear)🔥' }
    ]

    const styles = {
        select: `basic-multi-select ${isDark ? 'text-white' : 'text-black'} font-semibold focus:ring-0 w-full`,
    }

    const selectStyle = {
        valueContainer: (base: any) => ({
            ...base,
            background: `${isDark ? "black" : "#F5F5F5"}`,
        }),
        control: (base: any, state: any) => ({
            ...base,
            border: `${isDark ? "black" : "#F5F5F5"}`,
            background: `${isDark ? "black" : "#F5F5F5"}`,
        }),
        menuList: (styles: any) => ({
            ...styles,
            background: `${isDark ? "black" : "#F5F5F5"}`,
        }),
        placeholder: (defaultStyles: any) => {
            return {
                ...defaultStyles,
                color: `${isDark ? "white" : "black"}`,
            };
        },
    };

    return (
        <Select
            name={type === 'genres' ? 'genre' : 'type'}
            options={type === 'genres' ? genres : TypeOptions}
            className={styles.select}
            classNamePrefix={`Select ${type === 'genres' ? 'Genres' : 'Type'}`}
            defaultValue={type === 'genres' ? (
                post['genre'] === '' ?
                'Genre' : {value: post['genre'], label: post['genre']}) : (
                post['type'] === '' ?
                'Type' : {value: post['type'], label: post['type']}
            )}
            placeholder={type === 'genres' ? 'Genres' : 'Type'}
            theme={(theme) => ({
                ...theme,
                borderRadius: 0,
                colors: {
                ...theme.colors,
                primary25: 'liteblue',
                primary: 'black',
                neutral50: '#1A1A1A',
                },
            })}
            onChange={(e: any) => {
                if(type === 'genres')
                    post['genre'] = e.value
                else
                    post['type'] = e.value
                checkIsDisable()
            }}
            styles={selectStyle}
        />
    )
}

export default SelectComp
