import React, {createContext, useContext, useMemo, useState} from "react";
import {AuthContext} from "./AuthProvider";
import useFirestore from "../hooks/useFirestore";

export const AppContext = createContext({});

export default function AppProvider({children}) {
  const [isAddRoomVisible, setIsAddRoomVisible] = useState(false);
  const [isInviteMemberVisible, setIsInviteMemberVisible] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState('');

  const {user: {uid}} = useContext(AuthContext);
  /**
   * {
   *  name: string
   *  description: string
   *  member: array[uid]
   * }
   */

  const roomCondition = useMemo(() => {
    return {
      fieldName: 'members',
      operator: 'array-contains',
      compareValue: uid,
    }
  }, [uid])

  const rooms = useFirestore('rooms', roomCondition)
  console.log(uid);
  console.log(rooms);

  const selectedRoom = useMemo(
    () => rooms?.find((room) => room.id === selectedRoomId) || {},
    [rooms, selectedRoomId]
  )

  const usersCondition = useMemo(() => {
    return {
      fieldName: 'uid',
      operator: 'in',
      compareValue: selectedRoom.members || ['1'],
    }
  }, [selectedRoom.members])

  const members = useFirestore('users', usersCondition);

  return (
    <AppContext.Provider
      value={{
        rooms,
        isAddRoomVisible,
        setIsAddRoomVisible,
        selectedRoomId,
        setSelectedRoomId,
        selectedRoom,
        members,
        isInviteMemberVisible,
        setIsInviteMemberVisible,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
