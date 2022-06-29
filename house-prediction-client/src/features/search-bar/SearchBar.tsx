import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
    selectSearchInput,
    setSearchInput,
} from './searchBarSlice';
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SearchBar = () => {
    const dispatch = useAppDispatch();
    const positionInput = useAppSelector(selectSearchInput);
    const floors = Array.from(Array(30).keys());
    const rooms = Array.from(Array(10).keys());
    floors.splice(0,1);
    rooms.splice(0,1);
    const [startDate, setStartDate] = useState(new Date());
    
    return (
        <div className="flex justify-center items-center w-full gap-10">
            <label htmlFor="rooms" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">מספר חדרים</label>
            <select defaultValue={-1} onChange={e => dispatch(setSearchInput({...positionInput, rooms: parseInt(e.target.value)}))}  id="rooms" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value={-1}></option>
                {rooms.map(room => <option key={room} value={room}>{room}</option>)}
            </select>

            <label htmlFor="floor" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">קומה</label>
            <select id="floor" defaultValue={-1} onChange={e => dispatch(setSearchInput({...positionInput, floor: parseInt(e.target.value)}))} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value={-1}></option>
                {floors.map(floor => <option key={floor} value={floor}>{floor}</option>)}
            </select>

            <label htmlFor="property_type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">סוג הנכס</label>
            <select defaultValue={-1} onChange={e => dispatch(setSearchInput({...positionInput, propety_type: parseInt(e.target.value)}))} id="property_type" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value={-1}></option>
                <option value={1}>דירה</option>
                <option value={2}>קוטג' דו-משפחתי</option>
                <option value={3}>דירת גג</option>
                <option value={4}>דירת גן</option>
                <option value={5}>מסחרי</option>
                <option value={6}>וילה</option>
                <option value={7}>קוטג' טורי</option>
            </select>

            <label htmlFor="square_foot" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">מ"ר</label>
            <input type='number' onChange={e => dispatch(setSearchInput({...positionInput, square_foot: parseInt(e.target.value)}))} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />

            <ReactDatePicker onChange={e => dispatch(setSearchInput({...positionInput, day: e?.getDay() ?? -1, month: e?.getMonth() ?? -1, year: e?.getFullYear() ?? -1, }))} className="bg-gray-700 dark:text-gray-400 border rounded-lg" selected={startDate} />
        </div>
    );

}

export default SearchBar;