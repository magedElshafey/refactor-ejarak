import React, { useState } from 'react'
import RealStatesBody from '../../components/dashboard/realStates/RealStatesBody'
import RealStatesHeader from '../../components/dashboard/realStates/RealStatesHeader'

const Realstates = () => {
  const [search, setSearch] = useState();
  return (
    <>
      <RealStatesHeader onSearchChange={setSearch} />
      <RealStatesBody tableSearch={search} />
    </>
  )
}

export default Realstates
