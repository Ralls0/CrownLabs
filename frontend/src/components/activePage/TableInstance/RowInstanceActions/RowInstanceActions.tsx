import { FC, useState } from 'react';
import { Modal, Typography } from 'antd';
import Button from 'antd-button-color';
import { Instance, WorkspaceRole } from '../../../../utils';
import RowInstanceActionsPersistent from './RowInstanceActionsPersistent';
import RowInstanceActionsDropdown from './RowInstanceActionsDropdown';
import RowInstanceActionsExtended from './RowInstanceActionsExtended';
import SSHModalContent from '../SSHModalContent/SSHModalContent';
import RowInstanceActionsDefault from './RowInstanceActionsDefault';

const { Text } = Typography;
export interface IRowInstanceActionsProps {
  instance: Instance;
  now: Date;
  fileManager?: boolean;
  hasSSHKeys?: boolean;
  extended: boolean;
  viewMode: WorkspaceRole;
}

const RowInstanceActions: FC<IRowInstanceActionsProps> = ({ ...props }) => {
  const { instance, now, fileManager, hasSSHKeys, extended, viewMode } = props;

  const { persistent } = instance;

  const [sshModal, setSshModal] = useState(false);

  const getTime = () => {
    const timeStamp = new Date(instance.timeStamp!);
    if (timeStamp) {
      // Get Delta time
      let delta = (now.getTime() - timeStamp.getTime()) / 1000;
      // Get Years
      const years = Math.floor(delta / (86400 * 365));
      // Get Days
      delta -= years * (86400 * 365);
      const days = Math.floor(delta / 86400);
      // Get hours
      delta -= days * 86400;
      const hours = Math.floor(delta / 3600) % 24;
      // Get Minutes
      delta -= hours * 3600;
      const minutes = Math.floor(delta / 60) % 60;

      if (years !== 0) {
        return years + 'y ' + days + 'd';
      } else if (days !== 0) {
        return days + 'd ' + hours + 'h';
      } else if (hours !== 0) {
        return hours + 'h ' + minutes + 'm';
      } else if (minutes !== 0) {
        return minutes + 'm';
      } else return 'now';
    } else {
      return 'unknown';
    }
  };

  return (
    <>
      <div
        className={`w-full flex items-center ${
          extended ? 'justify-end sm:justify-between' : 'justify-end'
        }`}
      >
        {extended && (
          <div
            className={`flex justify-between items-center ${
              viewMode === WorkspaceRole.manager
                ? 'lg:w-2/5 xl:w-7/12 2xl:w-1/2'
                : 'lg:w-1/3 xl:w-1/2'
            }`}
          >
            <RowInstanceActionsExtended
              setSshModal={setSshModal}
              time={getTime()}
              viewMode={viewMode}
              instance={instance}
            />
            <Text className="hidden lg:block" strong>
              {getTime()}
            </Text>
          </div>
        )}
        <div
          className={`flex justify-end items-center gap-2 w-100 ${
            viewMode === WorkspaceRole.manager
              ? 'lg:w-3/5 xl:w-5/12 2xl:w-1/2'
              : 'lg:w-2/3 xl:w-1/2'
          } ${extended ? 'pr-2' : ''}`}
        >
          {persistent && (
            <RowInstanceActionsPersistent
              instance={instance}
              extended={extended}
            />
          )}
          <RowInstanceActionsDefault
            extended={extended}
            instance={instance}
            viewMode={viewMode}
          />
          <RowInstanceActionsDropdown
            instance={instance}
            setSshModal={setSshModal}
            fileManager={fileManager}
            extended={extended}
          />
        </div>
      </div>
      <Modal
        title="SSH Connection"
        width={550}
        visible={sshModal}
        onOk={() => setSshModal(false)}
        onCancel={() => setSshModal(false)}
        footer={<Button onClick={() => setSshModal(false)}>Close</Button>}
        centered
      >
        <SSHModalContent instanceIp={instance.ip} hasSSHKeys={hasSSHKeys!} />
      </Modal>
    </>
  );
};

export default RowInstanceActions;
