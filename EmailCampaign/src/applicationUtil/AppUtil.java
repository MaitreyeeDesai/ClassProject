package applicationUtil;

import java.text.DateFormat;
import java.util.Calendar;
import java.util.Date;

public class AppUtil {

	public static String getTodaysDateAsString(DateFormat format)
	{
		Date date=new Date();
		return format.format(date);
	}
	
	
	public static java.sql.Date getTodaysDate()
	{
		Calendar currenttime = Calendar.getInstance();
		java.sql.Date sqldate = new java.sql.Date((currenttime.getTime()).getTime());
		return sqldate;
	}
	
	
}
