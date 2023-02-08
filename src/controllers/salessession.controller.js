import { pool } from "../db/db.js";


export const PostSessionInfo = async (req, res) => {
    try {
        const { SDT_DateClosed } = req.body

        const Querys = 'SELECT SSS_DateCreated,SSS_DateClosed FROM STD_Session\
        WHERE SSS_Id = ?'

        const Values = [req.body.SDT_DateClosed]

        const [rows] = await pool.query(Querys, Values)
        //console.log(rows)
        if (rows.length <= 0) {
            return res.status(201).json({
                message: 'No hay dia aperturado'
            })
        } else {
            res.json({
                message: 'Autenticacion exitosa'
            });
        }
    } catch (error) {
        return res.status(401).json({
            message: error.message + 'Algo va mal en openning'
        })
    }

}

export const PostOpenSalesDate = async (req, res) => {
    try {
        const { SDT_DateClosed } = req.body

        const Querys = 'SET @OpenedSalesDateId;\
                        SET @NewSalesDateId;\
                        SET @TodayId;\
                        SET TodayId = NOW();\
        SELECT MAX(SDT_Id) INTO OpenedSalesDateId FROM STD_SalesDate WHERE SDT_DateClosed IS NULL ;\
            IF OpenedSalesDateId IS NULL THEN\
                SELECT IFNULL(MAX(SDT_DateClosed),{d "1900-01-01"}) FROM STD_SalesDate;\
                SELECT MAX(SDT_Id) INTO NewSalesDateId FROM STD_SalesDate;\
                IF NewSalesDateId IS NULL THEN\
                    SET NewSalesDateId = TodayId;\
                ELSE\
                    SET NewSalesDateId = ADDDATE(NewSalesDateId,1);\
                        IF NewSalesDateId < TodayId THEN\
                            SET NewSalesDateId = TodayId;\
                        END IF;\
                        INSERT INTO STD_SalesDate \
                        (SDT_Id,SDT_DateOpened,SDT_USR_OpenedBy,SDT_USR_ClosedBy,SDT_PreviousDateClosed,SDT_CreatedDateTime,SDT_ModifiedDateTime,\
                        SDT_ModifiedBy, SDT_Active)\
                        VALUES(NewSalesDateID,NOW(),UserID,NULL,NULL,LastClosedDay,NOW(),NOW(),ModifiedBy,1);\
                        INSERT INTO STD_Counter(CNT_Id,CNT_NumChange,CNT_AmountChange,CNT_USR_Id,CNT_CreatedDateTime,CNT_ModifiedDateTime)\
                        VALUES(NewSalesDateId,0,0,"Admin",NOW(),NOW());\
                END IF;\
            END IF;'
        console.log(Querys)
        const Values = [req.body.SDT_DateClosed]

        const [rows] = await pool.query(Querys, Values)
        //console.log(rows)
        if (rows.length <= 0) {
            return res.status(201).json({
                message: 'No hay dia aperturado'
            })
        } else {
            res.json({
                message: 'Autenticacion exitosa'
            });
        }
    } catch (error) {
        return res.status(401).json({
            message: error.message + ' - SalesSession Linea 32'
        })
    }

}

export const PostCloseSalesDate = async (req, res) => {
    try {
        const { SDT_DateClosed } = req.body

        const Querys = 'SET @Result = 1;\
        SELECT COUNT(*) INTO @Sessions  FROM STD_Session\
        WHERE SSS_DateClosed IS NULL ;\
        IF @Result = 1 THEN\
            SELECT SDT_Id INTO @DATE1 FROM STD_SalesDate WHERE SDT_DateClosed IS NULL;\
            SELECT @DATE1;\
            UPDATE STD_SalesDate SET SDT_DateClosed = NOW(), SDT_USR_ClosedBy = "Admin" WHERE SDT_DateClosed IS NULL;\
            ELSE\
            SELECT "No se puede cerrar el día de ventas. Aún hay turnos abiertos.";\
            END IF;'
        // console.log(Querys)
        // const Values = [req.body.SDT_DateClosed]
        const [rows] = await pool.query(Querys)
        // console.log(rows)        
        if (rows.length <= 0) {
            return res.status(201).json({
                message: 'No hay dia aperturado'
            })
        } else {
            res.json({
                message: 'Autenticacion exitosa'
            });
        }
    } catch (error) {
        return res.status(401).json({
            message: error.message + ' SalesSession Linea32'
        })
    }

}


