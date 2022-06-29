import React, { useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectPosition } from '../map/mapSlice';
import styles from './Counter.module.css';

export function Counter() {
  const positionInput = useAppSelector(selectPosition);
  const dispatch = useAppDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');

  const incrementValue = Number(incrementAmount) || 0;

  return (
    <div>
        <h1 className='text-white'>{positionInput}</h1>
    </div>
  );
}
