import React, { useState, useEffect, useContext } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { updateTimeRecord } from '../../resources/timeRecords';
import formatDuration from '../../helpers/formatDuration';
import { UserContext } from '../../Contexts/UserContext';
import Categories from '../../Components/Categories';
import { TextInput } from '../../formStyles';
import ManualTimer from './ManualTimer';

const TimeRecordWrapper = styled.div``;
const Label = styled(TextInput)``;
const DurationDisplay = styled.div``;

interface Props {
  startTime: moment.Moment;
  endTime: moment.Moment;
  recordLabel: string;
  recordCategory: string;
  id: number;
}

// UI to show a specific time record
export default function HistoryItem({
  startTime,
  endTime,
  recordLabel,
  recordCategory,
  id,
}: Props) {
  const [label, setLabel] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const { user } = useContext(UserContext);
  const duration = moment.duration(endTime.diff(startTime));
  const onChangeCategories = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value);
    updateTimeRecord(user.id, id, { category: event.target.value });
  };

  useEffect(() => {
    setLabel(recordLabel);
    setCategory(recordCategory);
  }, [recordLabel, recordCategory]);

  return (
    <TimeRecordWrapper>
      <Label
        data-testid="time-record-label"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        onBlur={() => updateTimeRecord(user.id, id, { label })}
      />
      <Categories category={category} onChange={onChangeCategories} />
      <DurationDisplay data-testid="time-record-duration">
        {formatDuration(duration)}
      </DurationDisplay>
      <ManualTimer id={id} startTime={startTime} endTime={endTime} />
    </TimeRecordWrapper>
  );
}
HistoryItem.defaultProps = {
  recordCategory: '',
};