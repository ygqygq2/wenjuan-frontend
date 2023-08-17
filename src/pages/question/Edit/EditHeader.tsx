import { EditOutlined, LeftOutlined, LoadingOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { useDebounceEffect, useKeyPress, useRequest } from 'ahooks';
import { Button, Checkbox, Divider, Input, Popover, Space, Tooltip, Typography, message } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import React, { ChangeEvent, FC, useEffect, useMemo, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { MANAGE_INDEX_PATHNAME } from '@/config/constants';
import { useGetAnswerRoles } from '@/hooks/useGetAnswerRoles';
import { useGetComponentInfo } from '@/hooks/useGetComponentInfo';
import { useGetPageInfo } from '@/hooks/useGetPageInfo';

import { updateQuestionService } from '@/services/question';
import { getRolesService } from '@/services/roles';
import { StateType } from '@/store';
import { AnswerRolesType, Role, changeAnswerRoles } from '@/store/answerRolesReducer';
import { changePageTitle } from '@/store/pageInfoReducer';

import styles from './EditHeader.module.scss';
import EditToolbar from './EditToolbar';

const { Title } = Typography;

const CheckboxGroup = Checkbox.Group;

const TitleElem: FC = () => {
  // const {title} = useGetPageInfo();
  const title = useSelector<StateType<any>, string>((state) => state.pageInfo.title); // Add type assertion to the title variable

  const dispatch = useDispatch();
  const [editState, setEditState] = useState(false);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const newTitle = event.target.value.trim();
    if (!newTitle) return;
    dispatch(changePageTitle(newTitle));
  }
  if (editState) {
    return (
      <Input
        value={title}
        onPressEnter={() => setEditState(false)}
        onBlur={() => setEditState(false)}
        onChange={handleChange}
      ></Input>
    );
  }
  return (
    <Space>
      <Title>{title}</Title>
      <Button icon={<EditOutlined></EditOutlined>} type="text" onClick={() => setEditState(true)}></Button>
    </Space>
  );
};

const RolesButton: FC = () => {
  const dispatch = useDispatch();
  const defaultCheckedList = useGetAnswerRoles();
  const [roles, setRoles] = useState<Role[]>([]);
  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>(defaultCheckedList);

  // 角色名数组
  const checkboxOptions = useMemo(() => roles.map((role) => ({ label: role.name, value: role.id })), [roles]);
  const plainOptions = useMemo(() => roles.map((role) => role.id), [roles]);
  const checkAll = plainOptions.length === checkedList.length;
  const indeterminate = checkedList.length > 0 && checkedList.length < plainOptions.length;

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const rolesData = (await getRolesService()) as Role[];
        setRoles(rolesData);
        setCheckedList(defaultCheckedList || []);
      } catch (error) {
        console.error('获取角色信息失败:', error);
      }
    };

    fetchRoles();
  }, [defaultCheckedList]);

  const onChange = (list: CheckboxValueType[]) => {
    setCheckedList(list);
    console.log(list);
    dispatch(changeAnswerRoles(list as AnswerRolesType));
  };

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    setCheckedList(e.target.checked ? plainOptions : []);
    dispatch(changeAnswerRoles(e.target.checked ? plainOptions : []));
  };

  return (
    <Popover
      content={
        <div>
          <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
            <Space>
              全选
              <Tooltip title="未选择表示所有人可回答">
                <QuestionCircleOutlined style={{ fontSize: '13px' }} />
              </Tooltip>
            </Space>
          </Checkbox>
          <Divider />
          <CheckboxGroup options={checkboxOptions} value={checkedList} onChange={onChange} />
        </div>
      }
      trigger="click"
      placement="bottom"
    >
      <Button>问卷回答角色设置</Button>
    </Popover>
  );
};

const SaveButton: FC = () => {
  const { id } = useParams();
  const { componentList = [] } = useGetComponentInfo();
  const pageInfo = useGetPageInfo();
  const answerRoles = useGetAnswerRoles();
  const location = useLocation();

  const fetchBackendData: boolean = location.state && location.state.fetchBackendData;
  const [saveCount, setSaveCount] = useState(0);

  // 保存 pageInfo componentList
  const { loading, run: save } = useRequest(
    async () => {
      if (!id) return;
      await updateQuestionService(id, { ...pageInfo, componentList, roles: answerRoles });
      console.log('🚀 ~ file: EditHeader.tsx:134 ~ pageInfo:', pageInfo);
    },
    { manual: true },
  );

  const handleSave = () => {
    if (fetchBackendData && saveCount === 0) {
      setSaveCount(saveCount + 1);
    } else {
      save();
    }
    setSaveCount(saveCount + 1);
  };

  // 快捷键
  useKeyPress(['ctrl.s', 'meta.s'], (event: KeyboardEvent) => {
    // 禁用网页默认保存
    event.preventDefault();
    if (!loading) handleSave();
  });

  // 自动保存
  useDebounceEffect(
    () => {
      handleSave();
    },
    [pageInfo, componentList, answerRoles],
    { wait: 1000 },
  );

  return (
    <Button onClick={save} disabled={loading} icon={loading ? <LoadingOutlined /> : null}>
      保存
    </Button>
  );
};

const PublishButton: FC = () => {
  const nav = useNavigate();
  const { id } = useParams();
  const { componentList = [] } = useGetComponentInfo();
  const pageInfo = useGetPageInfo();

  // 保存 pageInfo componentList
  const { loading, run: pub } = useRequest(
    async () => {
      if (!id) return;
      await updateQuestionService(id, { ...pageInfo, componentList, isPublished: true });
    },
    {
      manual: true,
      onSuccess() {
        message.success('发布成功');
        nav(`/question/stat/${id}`);
      },
    },
  );

  return (
    <Button type="primary" onClick={pub} disabled={loading}>
      发布
    </Button>
  );
};

const EditHeader: FC = () => {
  const nav = useNavigate();
  return (
    <div className={styles['header-wrapper']}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined></LeftOutlined>} onClick={() => nav(MANAGE_INDEX_PATHNAME)}>
              返回列表
            </Button>
            <TitleElem></TitleElem>
          </Space>
        </div>
        <div className={styles.main}>
          <EditToolbar></EditToolbar>
        </div>
        <div className={styles.right}>
          <Space>
            <RolesButton></RolesButton>
            <SaveButton></SaveButton>
            <PublishButton></PublishButton>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default EditHeader;
